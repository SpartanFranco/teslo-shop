export const revalidate = 604800;

import { redirect } from 'next/navigation';
import { getCategories, getProductBySlug } from '@/src/actions';
import { Metadata, ResolvingMetadata } from 'next';
import { Title } from '@/src/components';
import { ProductForm } from './ui/product-form';

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
			images: [
				{
					url: `/products/${product?.productImage[0]?.url}`,
				},
			],
		},
	};
};

export default async function ProductPage({ params }: Props) {
	const { slug } = await params;

	const [product, categories] = await Promise.all([
		getProductBySlug(slug),
		getCategories(),
	]);

	if (!product && slug !== 'new') {
		redirect('/admin/products');
	}
	const title = slug === 'new' ? 'Nuevo Producto' : 'Editar producto';
	return (
		<>
			<Title title={title} />
			<ProductForm
				product={product ?? {}}
				categories={categories}
			/>
		</>
	);
}
