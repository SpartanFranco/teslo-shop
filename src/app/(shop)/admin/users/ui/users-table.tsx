'use client';

import { changeUserRole } from '@/src/actions';
import { User } from '@/src/interfaces';

interface Props {
	users: User[];
}

export const UsersTable = ({ users }: Props) => {
	return (
		<div className='w-full overflow-x-auto'>
			<table className='w-full border-collapse'>
				<thead className='border-b bg-gray-200'>
					<tr>
						<th className='px-6 py-4 text-left text-sm font-medium text-gray-900'>
							#ID
						</th>
						<th className='px-6 py-4 text-left text-sm font-medium text-gray-900'>
							Nombre completo
						</th>
						<th className='px-6 py-4 text-left text-sm font-medium text-gray-900'>
							Email
						</th>
						<th className='px-6 py-4 text-left text-sm font-medium text-gray-900'>
							Role
						</th>
						<th className='px-6 py-4 text-left text-sm font-medium text-gray-900'>
							Actualizar role
						</th>
					</tr>
				</thead>

				<tbody>
					{users.map((user) => (
						<tr
							key={user.id}
							className='border-b bg-white transition hover:bg-gray-100'
						>
							<td className='px-6 py-4 text-sm font-medium whitespace-nowrap'>
								{user.id.split('-').at(-1)}
							</td>
							<td className='px-6 py-4 text-sm whitespace-nowrap'>
								{user.name}
							</td>
							<td className='px-6 py-4 text-sm whitespace-nowrap'>
								{user.email}
							</td>
							<td className='px-6 py-4 text-sm whitespace-nowrap'>
								{user.role}
							</td>
							<td className='px-6 py-4 text-sm whitespace-nowrap'>
								<select
									className='w-full rounded p-1 text-sm'
									value={user.role}
									onChange={(e) => changeUserRole(user.id, e.target.value)}
								>
									<option value='admin'>Admin</option>
									<option value='user'>User</option>
								</select>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
