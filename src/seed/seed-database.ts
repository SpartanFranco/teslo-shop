import { prisma } from '../lib/prisma';
import { initialData } from './seed';
import { countries } from './seed-countries';

async function main() {
	// await Promise.all([

	await prisma.orderItem.deleteMany();
	await prisma.orderAddress.deleteMany();
	await prisma.order.deleteMany();

	await prisma.userAddress.deleteMany();
	await prisma.user.deleteMany();

	await prisma.productImage.deleteMany();
	await prisma.product.deleteMany();
	await prisma.category.deleteMany();

	await prisma.country.deleteMany();
	// ])

	const { products, categories, users } = initialData;
	await prisma.country.createMany({ data: countries });
	await prisma.user.createMany({ data: users });
	const categoriesData = categories.map((c) => ({ name: c }));

	await prisma.category.createMany({ data: categoriesData });

	const categoriesDB = await prisma.category.findMany();

	const categoriesMap = categoriesDB.reduce<Record<string, string>>(
		(map, category) => {
			map[category.name.toLowerCase()] = category.id;

			return map;
		},
		{},
	);

	products.forEach(async (product) => {
		const { images, type, ...rest } = product;

		const dbProduct = await prisma.product.create({
			data: {
				...rest,
				categoryId: categoriesMap[type],
			},
		});
		const imagesData = images.map((img) => ({
			url: img,
			productId: dbProduct.id,
		}));
		await prisma.productImage.createMany({ data: imagesData });
	});
	console.log('Seed ejecutado');
}

(() => {
	if (process.env.NODE_ENV === 'production') return;
	try {
		main();
	} catch (error) {
		console.log('No se logró ejecutar el seed', error);
	}
})();
