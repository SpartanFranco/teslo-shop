'use server';

import { prisma } from '@/src/lib/prisma';

export const getStockBySlug = async (slug: string): Promise<number> => {
	try {
		const productStock = await prisma.product.findFirst({
			where: { slug },
			select: {
				inStock: true,
			},
		});

		return productStock?.inStock ?? 0;
	} catch (error) {
		console.log(error);
		return 0;
	}
};
