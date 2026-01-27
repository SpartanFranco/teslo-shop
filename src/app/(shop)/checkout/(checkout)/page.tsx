import Link from 'next/link';

import { Title } from '@/src/components';
import { ProductsInCart } from './ui/products-in-cart';
import { PlaceOrder } from './ui/place-order';

export default async function CheckoutPage() {
	return (
		<div className='flex items-center justify-center px-10 sm:px-0'>
			<div className='flex w-250 flex-col'>
				<Title title='Verificar orden' />

				<div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
					{/* Carrito */}
					<div className='mt-5 flex flex-col'>
						<span className='text-xl'>Ajustar elementos</span>
						<Link
							href='/cart'
							className='mb-5 underline'
						>
							Editar carrito
						</Link>

						{/* Items */}
						<ProductsInCart />
					</div>

					{/* Checkout - Resumen de orden */}
					<PlaceOrder />
				</div>
			</div>
		</div>
	);
}
