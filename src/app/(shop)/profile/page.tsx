import { auth } from '@/src/auth.config';
import { Title } from '@/src/components';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function ProfilePage() {
	const session = await auth();

	if (!session?.user) {
		redirect('/');
	}

	const { name, email, emailVerified, role, image } = session.user;

	return (
		<div className='mx-auto max-w-4xl px-4'>
			<Title title='Perfil' />

			{/* Header */}
			<div className='mt-8 flex items-center gap-6'>
				<Image
					src={image || '/imgs/avatar-placeholder.png'}
					alt={name}
					width={96}
					height={96}
					className='rounded-full object-cover'
				/>

				<div>
					<h2 className='text-2xl font-semibold text-gray-900'>{name}</h2>

					<p className='mt-1 text-sm text-gray-500 capitalize'>{role}</p>
				</div>
			</div>

			{/* Divider */}
			<div className='my-8 h-px w-full bg-gray-200' />

			{/* Info */}
			<div className='space-y-6'>
				<ProfileRow
					label='Correo electrónico'
					value={email}
				/>

				<ProfileRow
					label='Estado de la cuenta'
					value={
						emailVerified ? (
							<span className='text-green-600'>Correo verificado</span>
						) : (
							<span className='text-yellow-600'>
								Correo pendiente de verificación
							</span>
						)
					}
				/>

				<ProfileRow
					label='Rol'
					value={<span className='capitalize'>{role}</span>}
				/>
			</div>

			{/* Divider */}
			<div className='my-10 h-px w-full bg-gray-200' />

			{/* Actions */}
			<div className='flex gap-4'>
				<button
					disabled
					className='text-sm font-medium text-gray-400'
				>
					Editar perfil
				</button>

				<button
					disabled
					className='text-sm font-medium text-gray-400'
				>
					Cambiar contraseña
				</button>
			</div>
		</div>
	);
}

const ProfileRow = ({
	label,
	value,
}: {
	label: string;
	value: React.ReactNode;
}) => (
	<div className='grid grid-cols-1 gap-1 sm:grid-cols-3'>
		<span className='text-sm text-gray-500'>{label}</span>
		<span className='text-sm font-medium text-gray-900 sm:col-span-2'>
			{value}
		</span>
	</div>
);
