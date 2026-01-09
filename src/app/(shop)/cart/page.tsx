import Link from 'next/link';

// import { redirect } from 'next/navigation';

import { Title } from '@/src/components';
import { ProductsInCart } from './ui/products-in-cart';
import { OrderSummary } from './ui/order-summary';

export default function CartPage() {
	// redirect('/empty');

	return (
		<div className='mb-72 flex items-center justify-center px-10 sm:px-0'>
			<div className='flex w-250 flex-col'>
				<Title title='Carrito' />

				<div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
					{/* Carrito */}
					<div className='mt-5 flex flex-col'>
						<span className='text-xl'>Agregar más items</span>
						<Link
							href='/'
							className='mb-5 underline'
						>
							Continúa comprando
						</Link>
						{/* Items */}
						<ProductsInCart />
					</div>

					{/* Checkout - Resumen de orden */}
					<div className='h-fit rounded-xl bg-white p-7 shadow-xl'>
						<h2 className='mb-2 text-2xl'>Resumen de orden</h2>

						<OrderSummary />
						<div className='mt-5 mb-2 w-full'>
							<Link
								className='btn-primary flex justify-center'
								href='/checkout/address'
							>
								Checkout
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
