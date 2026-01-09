'use server';

import { auth } from '@/src/auth.config';
import { prisma } from '@/src/lib/prisma';

export const getOrderById = async (id: string) => {
	const session = await auth();

	if (!session?.user) {
		return {
			ok: false,
			message: 'Debe estar autenticado',
		};
	}
	try {
		const order = await prisma.order.findUnique({
			where: { id },
			include: {
				orderItems: {
					select: {
						quantity: true,
						price: true,
						size: true,
						product: {
							select: {
								slug: true,
								title: true,

								productImage: {
									select: {
										url: true,
									},
									take: 1,
								},
							},
						},
					},
				},
				orderAddresses: {
					include: {
						country: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		});

		if (!order) throw new Error(`orden - ${id} no existe`);

		if (session.user.role === 'user') {
			if (order.userId !== session.user.id) {
				throw new Error(`orden - ${id} no es de ese usuario`);
			}
		}

		const { orderItems, orderAddresses, ...restOrder } = order;
		return {
			ok: true,
			order: {
				...restOrder,
				orderItems: orderItems.map((item) => ({
					price: item.price,
					quantity: item.quantity,
					...item.product,
				})),
				address: orderAddresses,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'La orden no existe',
		};
	}
};
