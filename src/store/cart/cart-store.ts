import { CartProduct } from '@/src/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
	cart: CartProduct[];

	getTotalItems: () => number;
	getSummaryInformation: () => {
		subTotal: number;
		tax: number;
		total: number;
		itemsInCart: number;
	};

	addProductToCart: (product: CartProduct) => void;
	upadteProductQuantity: (product: CartProduct, quantity: number) => void;
	removeProduct: (product: CartProduct) => void;
	clearCart: () => void;
}

export const useCartStore = create<State>()(
	persist(
		(set, get) => ({
			cart: [],
			getTotalItems: () => {
				const { cart } = get();
				const totalItem = cart.reduce((acc, item) => acc + item.quantity, 0);
				return totalItem;
			},
			getSummaryInformation: () => {
				const { cart } = get();

				const subTotal = cart.reduce(
					(subTotal, product) => subTotal + product.quantity * product.price,
					0,
				);

				const tax = subTotal * 0.15;
				const total = subTotal + tax;
				const itemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

				return { subTotal, tax, total, itemsInCart };
			},
			addProductToCart: (product) => {
				const { cart } = get();

				//1. verificadr si existe ya en el carrito
				const productInCart = cart.some(
					(p) => p.id === product.id && p.size === product.size,
				);
				if (!productInCart) {
					set({ cart: [...cart, product] });
					return;
				}

				//2. Se que el producto existe por talla ... tengo que incrementar
				const updatedCartProduct = cart.map((item) => {
					if (item.id === product.id && item.size === product.size) {
						return { ...item, quantity: item.quantity + product.quantity };
					}
					return item;
				});
				set({ cart: updatedCartProduct });
			},
			upadteProductQuantity: (product, quantity) => {
				const { cart } = get();

				const updatedCart = cart.map((p) => {
					if (p.id === product.id && p.size === product.size) {
						return { ...p, quantity };
					}
					return p;
				});
				set({ cart: updatedCart });
			},
			removeProduct: (product) => {
				const { cart } = get();
				const updatedCart = cart.filter(
					(p) => p.id !== product.id || p.size !== product.size,
				);
				set({ cart: updatedCart });
			},
			clearCart: () => {
				set({ cart: [] });
			},
		}),
		{
			name: 'shopping-cart',
		},
	),
);
