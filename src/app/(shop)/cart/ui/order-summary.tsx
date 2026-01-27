'use client';

import { useLoaded } from '@/src/hooks';
import { useCartStore } from '@/src/store';
import { currencyFormat } from '@/src/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export const OrderSummary = () => {
	const router = useRouter();
	const isLoaded = useLoaded();
	const { total, itemsInCart, subTotal, tax } = useCartStore(
		useShallow((state) => state.getSummaryInformation()),
	);

	useEffect(() => {
		if (itemsInCart === 0 && isLoaded === true) {
			router.replace('/empty');
		}
	}, [isLoaded, itemsInCart, router]);

	if (!isLoaded) {
		return <h2>Cargando...</h2>;
	}

	return (
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
			<span className='mt-5 text-right text-2xl'>{currencyFormat(total)}</span>
		</div>
	);
};
