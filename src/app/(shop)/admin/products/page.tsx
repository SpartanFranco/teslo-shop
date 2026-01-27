export const revalidate = 0;

import { getPaginateProductsWithImages } from '@/src/actions';
// https://tailwindcomponents.com/component/hoverable-table

import { Pagination, ProductImage, Title } from '@/src/components';
import { currencyFormat } from '@/src/utils';
import Link from 'next/link';

interface Props {
	searchParams: Promise<{ page?: string }>;
}
export default async function OrdersPage({ searchParams }: Props) {
	const { page } = await searchParams;

	const { products, totalPages } = await getPaginateProductsWithImages({
		page: page ? parseInt(page) : 1,
	});

	return (
		<>
			<Title title='Mantenimiento de productos' />
			<div className='mb-5 flex justify-end'>
				<Link
					href={'/admin/product/new'}
					className='btn-primary'
				>
					Nuevo producto
				</Link>
			</div>
			{products?.length === 0 ? (
				<div className='mx-auto grid h-96 w-full place-content-center p-10'>
					<h2 className='text-5xl font-bold'>No hay productos</h2>
				</div>
			) : (
				<div className='mb-10'>
					<table className='min-w-full'>
						<thead className='border-b bg-gray-200'>
							<tr>
								<th
									scope='col'
									className='px-6 py-4 text-left text-sm font-medium text-gray-900'
								>
									Imagen
								</th>
								<th
									scope='col'
									className='px-6 py-4 text-left text-sm font-medium text-gray-900'
								>
									Titulo
								</th>
								<th
									scope='col'
									className='px-6 py-4 text-left text-sm font-medium text-gray-900'
								>
									Precio
								</th>
								<th
									scope='col'
									className='px-6 py-4 text-left text-sm font-medium text-gray-900'
								>
									Género
								</th>
								<th
									scope='col'
									className='px-6 py-4 text-left text-sm font-medium text-gray-900'
								>
									Inventario
								</th>
								<th
									scope='col'
									className='px-6 py-4 text-left text-sm font-medium text-gray-900'
								>
									Tallas
								</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr
									key={product.id}
									className='border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100'
								>
									<td className='px-2 py-4 text-sm font-medium whitespace-nowrap text-gray-900'>
										<Link href={`/product/${product.slug}`}>
											<ProductImage
												src={product.images[0]}
												width={100}
												height={100}
												alt={product.title}
												className='size-20 rounded object-cover'
											/>
										</Link>
									</td>
									<td className='px-6 py-4 text-sm font-light whitespace-nowrap text-gray-900'>
										<Link
											href={`/admin/product/${product.slug}`}
											className='hover:underline'
										>
											{product.title}
										</Link>
									</td>
									<td className='px-6 py-4 text-sm font-bold whitespace-nowrap text-gray-900'>
										{currencyFormat(product.price)}
									</td>

									<td className='px-6 py-4 text-sm font-light whitespace-nowrap text-gray-900'>
										{product.gender}
									</td>

									<td className='px-6 py-4 text-sm font-bold whitespace-nowrap text-gray-900'>
										{product.inStock}
									</td>

									<td className='px-6 py-4 text-sm font-bold whitespace-nowrap text-gray-900'>
										{product.sizes.join(', ')}
									</td>
								</tr>
							))}
						</tbody>
					</table>

					{totalPages && <Pagination totalPages={totalPages} />}
				</div>
			)}
		</>
	);
}
