export const revalidate = 60;
import { getPaginateProductsWithImages } from '@/src/actions';
import { Pagination, ProductGrid, Title } from '@/src/components';
import { Gender } from '@/src/generated/prisma/enums';

import { redirect } from 'next/navigation';

interface Props {
	params: Promise<{
		gender: string;
	}>;
	searchParams: Promise<{
		page?: string;
	}>;
}

export default async function CategoryByIdPage({
	params,
	searchParams,
}: Props) {
	const { gender } = await params;
	const { page } = await searchParams;

	const { products, totalPages } = await getPaginateProductsWithImages({
		page: page ? parseInt(page) : 1,
		gender: gender as Gender,
	});

	if (products.length < 1) {
		redirect('/');
	}
	const labels: Record<string, string> = {
		men: 'para hombres',
		women: 'para mujeres',
		kid: 'para niños',
		unisex: 'para todos',
	};

	return (
		<>
			<Title
				title={`Artículos ${labels[gender]}`}
				subtitle='Todos los productos'
				className='mb-2'
			/>

			<ProductGrid products={products} />
			{totalPages && <Pagination totalPages={totalPages} />}
		</>
	);
}
