export const revalidate = 0;

import { getPaginateOrders } from '@/src/actions';
// https://tailwindcomponents.com/component/hoverable-table

import { Title } from '@/src/components';
import clsx from 'clsx';
import { CreditCard } from 'lucide-react';

import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function OrdersPage() {
	const { ok, orders } = await getPaginateOrders();
	if (!ok) {
		redirect('/auth/login');
	}
	return (
		<>
			<Title title='Todas las orders' />

			<div className='mb-10'>
				<table className='min-w-full'>
					<thead className='border-b bg-gray-200'>
						<tr>
							<th
								scope='col'
								className='px-6 py-4 text-left text-sm font-medium text-gray-900'
							>
								#ID
							</th>
							<th
								scope='col'
								className='px-6 py-4 text-left text-sm font-medium text-gray-900'
							>
								Nombre completo
							</th>
							<th
								scope='col'
								className='px-6 py-4 text-left text-sm font-medium text-gray-900'
							>
								Estado
							</th>
							<th
								scope='col'
								className='px-6 py-4 text-left text-sm font-medium text-gray-900'
							>
								Opciones
							</th>
						</tr>
					</thead>
					<tbody>
						{orders?.map((order) => (
							<tr
								key={order.id}
								className='border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100'
							>
								<td className='px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900'>
									{order.id.split('-').at(-1)}
								</td>
								<td className='px-6 py-4 text-sm font-light whitespace-nowrap text-gray-900'>
									{order.orderAddresses?.firstName}{' '}
									{order.orderAddresses?.lastName}
								</td>
								<td className='flex items-center px-6 py-4 text-sm font-light whitespace-nowrap text-gray-900'>
									<CreditCard
										className={clsx({
											'text-green-800': order.isPaid,
											'text-red-800': !order.isPaid,
										})}
									/>
									<span
										className={clsx('mx-2', {
											'text-green-800': order.isPaid,
											'text-red-800': !order.isPaid,
										})}
									>
										{order.isPaid ? 'Pagada' : 'No Pagada'}
									</span>
								</td>
								<td className='px-6 text-sm font-light text-gray-900'>
									<Link
										href={`/orders/${order.id}`}
										className='hover:underline'
									>
										Ver orden
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
