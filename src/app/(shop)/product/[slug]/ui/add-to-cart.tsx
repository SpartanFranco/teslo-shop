'use client';

import { QuantitySelector, SizeSelector } from '@/src/components';
import { CartProduct, Product, Size } from '@/src/interfaces';
import { useCartStore } from '@/src/store';
import clsx from 'clsx';

import { useState } from 'react';

interface Props {
	product: Product;
}

export const AddToCart = ({ product }: Props) => {
	const addProductToCart = useCartStore((state) => state.addProductToCart);

	const [size, setSize] = useState<Size | undefined>();
	const [quantity, setQuantity] = useState(1);
	const [posted, setPosted] = useState(false);

	const addToCart = () => {
		if (!size) {
			setPosted(true);
			return;
		}

		const cartProduct: CartProduct = {
			id: product.id,
			slug: product.slug,
			title: product.title,
			price: product.price,
			quantity,
			size,
			image: product.images[1],
		};
		addProductToCart(cartProduct);
		setPosted(false);
		setQuantity(1);
		setSize(undefined);
	};

	return (
		<>
			{posted && !size && (
				<p className='text-red-500'>Debe seleccionar una talla</p>
			)}
			<SizeSelector
				selectedSize={size}
				availableSizes={product?.sizes}
				onSizeChange={setSize}
			/>

			{/* Selector de Cantidad */}
			<QuantitySelector
				quantity={quantity}
				onChangeQuantity={setQuantity}
			/>

			{/* Button */}
			<button
				className={clsx('my-5', {
					'btn-primary': product.inStock > 0,
					'btn-disabled': product.inStock === 0,
				})}
				onClick={addToCart}
			>
				Agregar al carrito
			</button>
		</>
	);
};
