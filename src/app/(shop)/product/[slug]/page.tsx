export const revalidate = 604800;

import { notFound } from 'next/navigation';

import { titleFont } from '@/src/config/fonts';
import {
	ProductMobileSlideshow,
	ProductSlideshow,
	StockLabel,
} from '@/src/components';
import { getProductBySlug } from '@/src/actions';
import { Metadata, ResolvingMetadata } from 'next';
import { AddToCart } from './ui/add-to-cart';
import { sleep } from '@/src/utils';

interface Props {
	params: Promise<{
		slug: string;
	}>;
}

export const generateMetadata = async (
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> => {
	const { slug } = await params;
	const product = await getProductBySlug(slug);
	return {
		title: product?.title ?? 'Producto no encontrado',
		description: product?.description ?? '',
		openGraph: {
			title: product?.title ?? 'Producto no encontrado',
			description: product?.description ?? 'sin descripcion',
			images: [{ url: `/products/${product?.images[1]}` }],
		},
	};
};

export default async function ProductPage({ params }: Props) {
	await sleep(100);
	const { slug } = await params;
	const product = await getProductBySlug(slug);

	if (!product) {
		notFound();
	}

	return (
		<div className='mt-5 mb-20 grid grid-cols-1 gap-3 md:grid-cols-3'>
			{/* Slideshow */}
			<div className='col-span-1 md:col-span-2'>
				{/* Mobile Slideshow */}
				<ProductMobileSlideshow
					title={product?.title}
					images={product?.images}
					className='block md:hidden'
				/>

				{/* Desktop Slideshow */}
				<ProductSlideshow
					title={product?.title}
					images={product?.images}
					className='hidden md:block'
				/>
			</div>

			{/* Detalles */}
			<div className='col-span-1 px-5'>
				<StockLabel slug={product?.slug} />
				<h1 className={` ${titleFont.className} text-lg font-bold antialiased`}>
					{product.title}
				</h1>
				<p className='mb-5 text-lg'>${product?.price}</p>

				<AddToCart product={product} />

				{/* Descripción */}
				<h3 className='text-sm font-bold'>Descripción</h3>
				<p className='font-light'>{product?.description}</p>
			</div>
		</div>
	);
}
