import { FC, PropsWithChildren } from "react"

type ImageCropperProps = {
  results: any[];
  images: File[];
};


export const ImageCropper: FC<PropsWithChildren<ImageCropperProps>> = ({results, images}) => {
  {console.log(results, images)}

  return (
    <>

    </>
  )
}