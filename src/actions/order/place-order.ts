'use server';

import { auth } from '@/src/auth.config';
import type { Address, Size } from '@/src/interfaces';
import { prisma } from '@/src/lib/prisma';

interface ProductToOrder {
	productId: string;
	quantity: number;
	size: Size;
}

export const placeOrder = async (
	productIds: ProductToOrder[],
	address: Address,
) => {
	const session = await auth();
	const userId = session?.user.id;
	if (!userId) {
		return {
			ok: false,
			message: 'No hay sesión de usuario',
		};
	}

	//obtener la información de los productos
	//? Nota: Pueden llevar más de un producto con el mismo ID

	const products = await prisma.product.findMany({
		where: {
			id: {
				in: productIds.map((p) => p.productId),
			},
		},
	});
	//calcular los montos //Encabezado

	const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

	// totales de tax,subtotal y total

	const { subTotal, tax, total } = productIds.reduce(
		(totals, item) => {
			const productQuantity = item.quantity;
			const product = products.find((product) => product.id === item.productId);
			if (!product) {
				throw new Error(`${item.productId} no existe`);
			}

			const subTotal = product.price * productQuantity;

			totals.subTotal += subTotal;
			totals.tax += subTotal * 0.15;
			totals.total += subTotal * 1.15;
			return totals;
		},
		{
			subTotal: 0,
			tax: 0,
			total: 0,
		},
	);
	console.log({ subTotal, tax, total });

	// crear la transacción

	try {
		const prismaTx = await prisma.$transaction(async (tx) => {
			// 1. Actualizar el stock de los productos.

			//acumular los valores
			const updatedProductsPromises = products.map((product) => {
				const productQuantity = productIds
					.filter((p) => p.productId === product.id)
					.reduce((acc, item) => acc + item.quantity, 0);
				if (productQuantity === 0) {
					throw new Error(`${product.id} no tiene cantidad definida`);
				}
				return tx.product.update({
					where: { id: product.id },
					data: {
						// inStock:product.inStock-productQuantity //!no hacer
						inStock: {
							decrement: productQuantity,
						},
					},
				});
			});

			const updatedProducts = await Promise.all(updatedProductsPromises);

			//verificar valores negativos=no hay stock

			updatedProducts.forEach((product) => {
				if (product.inStock < 0) {
					throw new Error(`${product.title} no tiene inventario suficiente`);
				}
			});

			//2.Crear la orden - Encabezazdo - detalle
			const order = await tx.order.create({
				data: {
					userId,
					itemsInOrder,
					subTotal,
					tax,
					total,

					orderItems: {
						createMany: {
							data: productIds.map((product) => ({
								quantity: product.quantity,
								size: product.size,
								productId: product.productId,
								price:
									products.find((p) => p.id === product.productId)?.price ?? 0,
							})),
						},
					},
				},
			});

			// verificar si el price es 0 ,lanzar un error

			//3. Crear la dirección de la orden.

			const { country, ...restAddress } = address;
			const orderAddress = await tx.orderAddress.create({
				data: {
					orderId: order.id,
					...restAddress,
					countryId: country,
				},
			});

			return { order, orderAddress, updatedProducts };
		});

		return {
			ok: true,
			order: prismaTx.order,
			prismaTx,
		};
	} catch (error: any) {
		console.log(error);
		return {
			ok: false,
			message: error.message,
		};
	}
};
