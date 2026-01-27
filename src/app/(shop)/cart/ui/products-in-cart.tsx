'use client';

import { ProductImage, QuantitySelector } from '@/src/components';
import { useLoaded } from '@/src/hooks';
import { CartProduct } from '@/src/interfaces';
import { useCartStore } from '@/src/store';
import { currencyFormat } from '@/src/utils';
import Link from 'next/link';

export const ProductsInCart = () => {
	const isLoaded = useLoaded();
	const upadteProductQuantity = useCartStore(
		(state) => state.upadteProductQuantity,
	);
	const removeItem = useCartStore((state) => state.removeProduct);
	const productsInCart = useCartStore((state) => state.cart);

	if (!isLoaded) {
		return <h2>Cargando...</h2>;
	}

	const updateProduct = (product: CartProduct) => (quantity: number) =>
		upadteProductQuantity(product, quantity);
	return (
		<>
			{productsInCart.map((product) => (
				<div
					key={`${product.slug} -  ${product.size}`}
					className='mb-5 flex'
				>
					<ProductImage
						src={product.image}
						width={100}
						height={100}
						style={{
							width: '100px',
							height: '100px',
						}}
						alt={product.title}
						className='mr-5 rounded'
					/>

					<div>
						<Link
							href={`/product/${product.slug}`}
							className='cursor-pointer hover:underline'
						>
							{product.size} - {product.title}
						</Link>
						<p>{currencyFormat(product.price)}</p>
						<QuantitySelector
							quantity={product.quantity}
							onChangeQuantity={updateProduct(product)}
						/>

						<button
							className='mt-3 underline'
							onClick={() => removeItem(product)}
						>
							Remover
						</button>
					</div>
				</div>
			))}
		</>
	);
};
