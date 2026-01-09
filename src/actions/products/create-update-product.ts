'use server';

import { Product } from '@/src/generated/prisma/client';
import { Gender, Size } from '@/src/generated/prisma/enums';
import { prisma } from '@/src/lib/prisma';
import z from 'zod';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_UR ?? '');

const productSchema = z.object({
	id: z.uuid().optional().nullable(),
	title: z.string().min(3).max(255),
	slug: z.string().min(3).max(255),
	description: z.string(),
	price: z.coerce
		.number()
		.min(0)
		.transform((val) => Number(val.toFixed(2))),
	inStock: z.coerce
		.number()
		.min(0)
		.transform((val) => Number(val.toFixed(0))),
	categoryId: z.uuid(),
	sizes: z.coerce.string().transform((val) => val.split(',')),
	tags: z.string(),
	gender: z.enum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
	const data = Object.fromEntries(formData);
	const productParsed = productSchema.safeParse(data);

	if (!productParsed.success) {
		console.log(productParsed.error);
		return {
			ok: false,
		};
	}

	const product = productParsed.data;

	product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

	const { id, ...restProduct } = product;

	try {
		const prismaTx = await prisma.$transaction(async (tx) => {
			let product: Product;

			const tagsArray = restProduct.tags
				.split(',')
				.map((tag) => tag.trim().toLowerCase());
			if (id) {
				//actualizar
				product = await tx.product.update({
					where: { id },
					data: {
						...restProduct,
						sizes: {
							set: restProduct.sizes as Size[],
						},
						tags: {
							set: tagsArray,
						},
					},
				});
			} else {
				// crear

				product = await tx.product.create({
					data: {
						...restProduct,
						sizes: {
							set: restProduct.sizes as Size[],
						},
						tags: {
							set: tagsArray,
						},
					},
				});
			}

			//proceso de carga y guardado de imagenes

			if (formData.getAll('images')) {
				//https://url.jpeg ,  https://url2.jpeg
				const images = await uploadImages(formData.getAll('images') as File[]);

				if (!images) {
					throw new Error('No se pudo cargar las imagenes,rollingback');
				}

				await prisma.productImage.createMany({
					data: images.map((img) => ({
						url: img!,
						productId: product.id,
					})),
				});
			}
			return { product };
		});

		revalidatePath(`/admin/products`);
		revalidatePath(`/admin/product/${product.slug}`);
		revalidatePath(`/products/${product.slug}`);
		return {
			ok: true,
			product: prismaTx.product,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'No se pudo crear el producto',
		};
	}
};

const uploadImages = async (images: File[]) => {
	try {
		const uploadPromises = images.map(async (img) => {
			try {
				const buffer = await img.arrayBuffer();
				const base64Image = Buffer.from(buffer).toString('base64');

				return cloudinary.uploader
					.upload(`data:image/png;base64,${base64Image}`)
					.then((res) => res.secure_url);
			} catch (error) {
				console.log(error);
				return null;
			}
		});

		const uploadedImages = await Promise.all(uploadPromises);

		return uploadedImages;
	} catch (error) {
		console.log(error);
		return null;
	}
};
