import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  width: number;
  height: number;
  style?: object
}

export const ProductImage = ({
  src,
  alt,
  className,
  width,
  height,
  style
}: Props) => {

  const localSrc = ( src ) ? 
                      src.startsWith('http') ? 
                        src
                        :
                        `/products/${src}`
                    : '/imgs/placeholder.jpg'

  return (
    <Image
      src={ localSrc }
      width={ width }
      height={ height }
      className={ className }
      alt={alt}
      style={style}
    />
  );
};
