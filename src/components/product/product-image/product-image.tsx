import Image, { type ImageProps } from 'next/image';

interface ProductImageProps extends Omit<ImageProps, 'src' | 'alt'> {
	src?: string;
	alt: string;
}

export const ProductImage = ({ src, alt, ...props }: ProductImageProps) => {
	const newSrc = src
		? src.startsWith('http')
			? src
			: `/products/${src}`
		: '/imgs/placeholder.png';
	return (
		<Image
			src={newSrc}
			alt={alt}
			{...props}
		/>
	);
};
