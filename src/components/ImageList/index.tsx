/**
 * 图片列表展示组件,支持多张图片预览切换
 */
import { View } from "@tarojs/components";
import {
  Image,
  ImagePreview,
  ImagePreviewProps,
  ImageProps,
} from "@nutui/nutui-react-taro";
import { useState } from "react";
import "./index.scss";

type ImageMergeProps = ImageProps & ImagePreviewProps;
interface ImageListProps extends ImageMergeProps {
  imageList: Array<ImageMergeProps & { minioPath: string; [key: string]: any }>;
}

export default function ImageList(props: ImageListProps) {
  const { imageList, ...rest } = props;
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const images = imageList?.map((e) => ({ src: OSS_URL + e.minioPath })) || [];
  return (
    <View className="images">
      {images.map((e, i: number) => {
        return (
          <Image
            {...rest}
            className="image-item"
            key={i}
            src={e.src}
            mode="scaleToFill"
            width="40"
            height="40"
            onClick={() => {
              setActiveIndex(i + 1);
              setShowPreview(true);
            }}
          />
        );
      })}
      <ImagePreview
        {...rest}
        value={activeIndex}
        images={images}
        visible={showPreview}
        onClose={() => {
          setShowPreview(false);
        }}
      />
    </View>
  );
}
