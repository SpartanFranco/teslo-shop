'use server';

import { auth } from '@/src/auth.config';
import { prisma } from '@/src/lib/prisma';

export const getOrdersByUser = async () => {
	const session = await auth();
	if (!session?.user) {
		return {
			ok: false,
			message: 'Debe estar autenticado',
		};
	}

	const orders = await prisma.order.findMany({
		where: {
			userId: session.user.id,
		},
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
