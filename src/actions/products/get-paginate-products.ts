'use server';

import { Gender } from '@/src/generated/prisma/enums';
import { prisma } from '@/src/lib/prisma';

interface PaginateOptions {
	page?: number;
	take?: number;
	gender?: Gender;
}
export const getPaginateProductsWithImages = async ({
	page = 1,
	take = 12,
	gender,
}: PaginateOptions) => {
	if (isNaN(Number(page))) page = 1;
	if (page < 1) page = 1;

	try {
		const products = await prisma.product.findMany({
			take,
			skip: (page - 1) * take,
			include: {
				productImage: {
					take: 2,
					select: { url: true },
				},
			},
			where: {
				gender,
			},
		});

		const totalCount = await prisma.product.count({
			where: {
				gender,
			},
		});
		const totalPages = Math.ceil(totalCount / take);
		return {
			currentPage: 1,
			totalPages,
			products: products.map(({ productImage, ...p }) => ({
				...p,
				images: productImage.map((img) => img.url),
			})),
		};
	} catch (error) {
		console.log('No se pudo cargar los productos', error);
		return {
			products: [],
		};
	}
};
