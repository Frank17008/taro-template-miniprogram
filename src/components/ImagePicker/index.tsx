import { useMemo } from "react";
import Taro from "@tarojs/taro";
import {
  deleteMinIoImg,
  saveImg,
  deleteImg,
  UPLOAD_URL,
} from "@/service/common";
import { Uploader } from "@nutui/nutui-react-taro";
import "./index.scss";

const ImagePicker = ({
  onChange,
  fileList,
  extra,
  disabled = false,
}: {
  disabled?: boolean;
  onChange?: Function;
  fileList?: any[];
  extra?: { mode: "add" | "edit"; [key: string]: any };
}) => {
  const accessInfo = Taro.getStorageSync("accessInfo");
  // 图片回显时需要构造组件所需的status\type字段
  const files = useMemo(() => {
    const _files = fileList?.map((item) => ({
      ...item,
      uid: item.id,
      name: item.name,
      url: item.url,
      status: "success",
      type: "image",
    }));
    return _files || [];
  }, [fileList]);

  /**
   * 文件删除前操作
   * @param _file 文件对象
   * @returns
   */
  const beforeDelete: any = async (_file) => {
    if (extra?.mode === "edit") {
      if (_file.status === "error") return true;
      const res: any = await deleteImage(_file?.id);
      return res?.code === 200;
    } else {
      const deleteIndex = files?.findIndex(
        (item) => _file?.name.indexOf(item.name) > -1
      );
      const minioFilename = files[deleteIndex]?.minioFilename;
      files.splice(deleteIndex, 1);
      if (_file.status === "error") {
        onChange && onChange(files);
        return;
      }
      const res: any = await deleteMinIoImg({ fileName: minioFilename });
      res.code === 200 && onChange && onChange(files);
    }
  };

  /**
   * 自定义上传
   * @param taroUploadFile
   * @param options
   */
  const beforeXhrUpload = (taroUploadFile: any, options: any) => {
    const uploadTask = taroUploadFile({
      url: options.url,
      filePath: options.taroFilePath,
      fileType: options.fileType,
      name: options.name,
      formData: options.formData,
      header: {
        "Tenant-Id": accessInfo?.tenantId || "000000",
        "Blade-auth": accessInfo?.accessToken,
        "Content-Type": "multipart/form-data",
        ...options.headers,
      },
      success(response: { errMsg: any; statusCode: number; data: string }) {
        if (options.xhrState === response.statusCode) {
          try {
            const result = JSON.parse(response?.data);
            saveImage(result?.data);
          } catch (error) {}
          options.onSuccess?.(response, options);
        } else {
          options.onFailure?.(response, options);
        }
      },
      fail(e: any) {
        Taro.showToast({ title: "上传失败", icon: "error" });
        options.onFailure?.(e, options);
      },
    });
    options.onStart?.(options);
    uploadTask.progress(
      (res: {
        progress: any;
        totalBytesSent: any;
        totalBytesExpectedToSend: any;
      }) => {
        options.onProgress?.(res, options);
      }
    );
  };
  /**
   * 图片点击操作
   */
  const onFileItemClick = (fileItem) => {
    if (fileItem.url) {
      Taro.previewImage({
        current: fileItem.url,
        urls: files.map((item) => item.url),
      });
      return;
    }
    try {
      const { responseText } = fileItem;
      const minioUrl = JSON.parse(responseText.data)?.data?.link;
      minioUrl && Taro.previewImage({ current: minioUrl, urls: [minioUrl] });
    } catch (error) {
      console.error(error);
    }
  };

  const getCaption = (str: string, code: string) => {
    // 截取某字符后的字符串
    const index = str.lastIndexOf(code);
    str = str.substring(index + 1, str.length);
    return str;
  };
  /**
   * 保存图片至数据库
   * @param file
   */
  const saveImage = async (_file) => {
    let temp = [...files];
    let item = {
      // 文件类型 99代表图片
      category: "99",
      // 接口返回的minio的文件名
      minioFilename: _file?.name,
      //上传后的临时文件名
      name: getCaption(_file?.originalName, "/"),
      // 文件扩展名
      extension: getCaption(_file?.originalName, "."),
      // 接口返回的图片的网络url, 如果有代理则优先使用代理地址进行转发
      url: OSS_URL ? `${OSS_URL}${_file?.name}` : _file?.link,
    };
    // 编辑模式时 保存图片与minio的关联关系
    if (extra?.mode === "edit" && extra?.resourceId) {
      const res: any = await saveImg({
        ...item,
        resourceId: extra?.resourceId,
      });
      // 绑定id属性，用于删除图片时传参
      item["id"] = res.data || null;
    }
    temp.push(item);
    const uploadedFiles = temp.filter((file) => file.minioFilename);
    onChange && onChange(uploadedFiles);
  };
  const deleteImage = async (fileId) => {
    if (extra?.mode !== "edit") return;
    const res: any = await deleteImg({ imageId: fileId });
    const deleteIndex = files?.findIndex((item) => item.id === fileId);
    if (res.code === 200) {
      files.splice(deleteIndex, 1);
      onChange && onChange(files);
    }
  };

  return (
    <Uploader
      className="img-picker-wrapper"
      url={UPLOAD_URL}
      name="file"
      fit="contain"
      method="post"
      mediaType={["image"]}
      maxCount={disabled ? files.length : "3"}
      deletable={!disabled}
      value={files}
      beforeDelete={beforeDelete}
      beforeXhrUpload={beforeXhrUpload}
      onFileItemClick={onFileItemClick}
    />
  );
};

export default ImagePicker;
