import { forwardRef, type ImgHTMLAttributes } from 'react'

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fittingType?: string
  originWidth?: number
  originHeight?: number
  focalPointX?: number
  focalPointY?: number
}

export const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const { fittingType, originWidth, originHeight, focalPointX, focalPointY, ...imgProps } = props;
  return <img ref={ref} {...imgProps} />
})
Image.displayName = 'Image'
