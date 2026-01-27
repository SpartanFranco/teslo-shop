export const revalidate = 60;

import { getPaginateProductsWithImages } from '@/src/actions';
import { Pagination, ProductGrid, Title } from '@/src/components';

interface Props {
	searchParams: Promise<{
		page?: string;
	}>;
}
export default async function Home({ searchParams }: Props) {
	const { page } = await searchParams;

	const { products, totalPages } = await getPaginateProductsWithImages({
		page: page ? parseInt(page) : 1,
	});

	return (
		<>
			<Title
				title='Tienda'
				subtitle='Todos los productos'
				className='mb-2'
			/>

			<ProductGrid products={products} />
			{totalPages && <Pagination totalPages={totalPages} />}
		</>
	);
}
