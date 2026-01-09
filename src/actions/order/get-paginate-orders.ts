'use server';

import { auth } from '@/src/auth.config';
import { prisma } from '@/src/lib/prisma';

export const getPaginateOrders = async () => {
	const session = await auth();
	if (!session?.user && session?.user.role !== 'admin') {
		return {
			ok: false,
			message: 'Debe estar autenticado y debe ser administrador ',
		};
	}

	const orders = await prisma.order.findMany({
		orderBy: { createdAt: 'desc' },

		include: {
			orderAddresses: {
				select: {
					firstName: true,
					lastName: true,
				},
			},
		},
	});
	return {
		ok: true,
		orders,
	};
};
