import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function EmptyPage() {
	return (
		<div className='flex h-full items-center justify-center'>
			<ShoppingCart
				size={80}
				className='mx-5'
			/>

			<div className='flex flex-col items-center'>
				<h1 className='text-xl font-semibold'>Tu carrito está vacío</h1>

				<Link
					href='/'
					className='mt-2 text-4xl text-blue-500'
				>
					Regresar
				</Link>
			</div>
		</div>
	);
}
