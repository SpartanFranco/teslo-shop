'use client';

import { placeOrder } from '@/src/actions';
import { useLoaded } from '@/src/hooks';
import { useAddressStore, useCartStore } from '@/src/store';
import { currencyFormat } from '@/src/utils';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

export const PlaceOrder = () => {
	const loaded = useLoaded();

	const [isPlacingOrder, setIsPlacingOrder] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const address = useAddressStore((state) => state.address);
	const { total, itemsInCart, subTotal, tax } = useCartStore(
		useShallow((state) => state.getSummaryInformation()),
	);
	const cart = useCartStore((state) => state.cart);
	const clearCart = useCartStore((state) => state.clearCart);

	const router = useRouter();
	const onPlaceOrder = async () => {
		setIsPlacingOrder(true);

		const productsToOrder = cart.map((p) => ({
			productId: p.id,
			size: p.size,
			quantity: p.quantity,
		}));

		const res = await placeOrder(productsToOrder, address);

		if (!res.ok) {
			setIsPlacingOrder(false);
			setErrorMessage(res.message);
			return;
		}

		clearCart();
		router.replace(`/orders/${res.order?.id}`);
	};
	if (!loaded) {
		return <h2>Cargando...</h2>;
	}
	return (
		<div className='rounded-xl bg-white p-7 shadow-xl'>
			<h2 className='mb-2 text-2xl'>Dirección de entrega</h2>
			<div className='mb-10'>
				<p className='text-xl'>
					{address.firstName} {address.lastName}
				</p>
				<p>{address.address}</p>
				<p>{address.address2}</p>
				<p>{address.postalCode}</p>
				<p>
					{address.city},{address.country}
				</p>

				<p>{address.phone}</p>
			</div>

			{/* Divider */}
			<div className='mb-10 h-0.5 w-full rounded bg-gray-200' />

			<h2 className='mb-2 text-2xl'>Resumen de orden</h2>

			<div className='grid grid-cols-2'>
				<span>No. Productos</span>
				<span className='text-right'>
					{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
				</span>

				<span>Subtotal</span>
				<span className='text-right'>{currencyFormat(subTotal)}</span>

				<span>Impuestos (15%)</span>
				<span className='text-right'>{currencyFormat(tax)}</span>

				<span className='mt-5 text-2xl'>Total:</span>
				<span className='mt-5 text-right text-2xl'>
					{currencyFormat(total)}
				</span>
			</div>

			<div className='mt-5 mb-2 w-full'>
				<p className='mb-5'>
					{/* Disclaimer */}
					<span className='text-xs'>
						Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros{' '}
						<a
							href='#'
							className='underline'
						>
							términos y condiciones
						</a>{' '}
						y{' '}
						<a
							href='#'
							className='underline'
						>
							política de privacidad
						</a>
					</span>
				</p>
				<p className='text-error'>{errorMessage}</p>
				<button
					className={clsx('flex w-full justify-center', {
						'btn-primary': !isPlacingOrder,
						'btn-disabled': isPlacingOrder,
					})}
					disabled={isPlacingOrder}
					onClick={onPlaceOrder}

					// href='/orders/123'
				>
					Colocar orden
				</button>
			</div>
		</div>
	);
};
