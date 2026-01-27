export const revalidate = 0;

import { getPaginateUsers } from '@/src/actions';
// https://tailwindcomponents.com/component/hoverable-table

import { Pagination, Title } from '@/src/components';

import { redirect } from 'next/navigation';
import { UsersTable } from './ui/users-table';

interface Props {
	searchParams: Promise<{ page?: string }>;
}
export default async function OrdersPage({ searchParams }: Props) {
	const { page } = await searchParams;
	const { ok, users, totalPages } = await getPaginateUsers({
		page: parseInt(page ?? '1'),
	});
	if (!ok) {
		redirect('/auth/login');
	}
	return (
		<>
			<Title title='Administración de usuarios' />

			{users?.length === 0 ? (
				<div className='mx-auto grid h-96 w-full place-content-center p-10'>
					<h2 className='text-5xl font-bold'>No hay usuarios</h2>
				</div>
			) : (
				<div className='mb-10 w-full'>
					<UsersTable users={users ?? []} />
					{totalPages && totalPages > 1 && (
						<Pagination totalPages={totalPages} />
					)}
				</div>
			)}
		</>
	);
}
