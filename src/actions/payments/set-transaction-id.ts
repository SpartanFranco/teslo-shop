'use server';

import { prisma } from '@/src/lib/prisma';

export const setTransactionId = async (
	orderId: string,
	transactionId: string,
) => {
	try {
		const order = await prisma.order.update({
			where: {
				id: orderId,
			},
			data: {
				transactionId,
			},
		});

		if (!order) throw new Error(`La orden - ${orderId} no existe `);

		console.log({ order });
		return {
			ok: true,
		};
	} catch (error: any) {
		console.log({ error });
		return {
			ok: false,
			message: error.message ?? 'No se pudo actualizar la orden',
		};
	}
};
