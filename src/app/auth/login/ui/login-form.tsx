'use client';

import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { authenticate } from '@/src/actions';
import { InfoIcon } from 'lucide-react';
// import { useRouter } from 'next/navigation';

export const LoginForm = () => {
	// const router = useRouter();
	const [state, dispatch, pending] = useActionState(authenticate, undefined);

	console.log(state);

	useEffect(() => {
		if (state === 'Success') {
			// redireccionar
			// router.replace('/');
			window.location.replace('/');
		}
	}, [state]);

	return (
		<form
			action={dispatch}
			className='flex flex-col'
		>
			<label htmlFor='email'>Correo electrónico</label>
			<input
				className='mb-5 rounded border bg-gray-200 px-5 py-2'
				type='email'
				name='email'
			/>

			<label htmlFor='email'>Contraseña</label>
			<input
				className='mb-5 rounded border bg-gray-200 px-5 py-2'
				type='password'
				name='password'
			/>

			<div
				className='flex h-8 items-end space-x-1'
				aria-live='polite'
				aria-atomic='true'
			>
				{state === 'CredentialsSignin' && (
					<div className='mb-2 flex flex-row'>
						<InfoIcon className='h-5 w-5 text-red-500' />
						<p className='text-sm text-red-500'>
							Credenciales no son correctas
						</p>
					</div>
				)}
			</div>

			<button
				type='submit'
				className={clsx({
					'btn-primary': !pending,
					'btn-disabled': pending,
				})}
				disabled={pending}
			>
				Ingresar
			</button>
			{/* <button type="submit" className="btn-primary">
        Ingresar
      </button> */}

			{/* divisor l ine */}
			<div className='my-5 flex items-center'>
				<div className='flex-1 border-t border-gray-500'></div>
				<div className='px-2 text-gray-800'>O</div>
				<div className='flex-1 border-t border-gray-500'></div>
			</div>

			<Link
				href='/auth/new-account'
				className='btn-secondary text-center'
			>
				Crear una nueva cuenta
			</Link>
		</form>
	);
};
