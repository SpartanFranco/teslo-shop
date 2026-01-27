'use server';
import { prisma } from '@/src/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config(process.env.CLOUDINARY_UR ?? '');

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
	if (!imageUrl.startsWith('http')) {
		console.log('no se asd');
		return {
			ok: false,
			error: 'No se pueden borrar imagenes del fileSystem',
		};
	}
	const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';

	try {
		await cloudinary.uploader.destroy(imageName);
		const deletedImage = await prisma.productImage.delete({
			where: { id: imageId },
			select: {
				product: {
					select: {
						slug: true,
					},
				},
			},
		});
		revalidatePath(`/admin/products`);
		revalidatePath(`/admin/product/${deletedImage.product.slug}`);
		revalidatePath(`/products/${deletedImage.product.slug}`);
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'No se pudp eliminar la imagen',
		};
	}
};
