import request from "./request";
import prefix from "./prefix";

const { api } = prefix;

// 上传图片地址
export const UPLOAD_URL = `${BASE_URL}${api}/blade-resource/oss/endpoint/put-file`;

/**
 * 删除minio中的图片
 * @param params
 * @param params.fileName minio中的文件名称
 */
export const deleteMinIoImg = (params) => {
  return request.post(
    `${BASE_URL}${api}/blade-resource/oss/endpoint/remove-file`,
    {
      params,
    }
  );
};

/**
 * 保存图片入库
 */
export const saveImg = (data) => {
  return request.post(
    `${BASE_URL}${api}/pointcloud-village-app/image/saveImage`,
    {
      data,
    }
  );
};

/**
 * 删除图片
 */
export const deleteImg = (params: { imageId: string }) => {
  return request.delete(
    `${BASE_URL}${api}/pointcloud-village-app/image/deleteImage?imageId=${params.imageId}`
  );
};
