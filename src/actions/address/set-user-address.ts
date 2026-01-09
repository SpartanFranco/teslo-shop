'use server';

import { Address } from '@/src/interfaces';
import { prisma } from '@/src/lib/prisma';

export const setUserAddress = async (address: Address, userId: string) => {
	try {
		const newAddress = await createOrReplaceAddress(address, userId);
		return {
			ok: true,
			address: newAddress,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			msg: 'No se pudo grabar la dirección',
		};
	}
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
	try {
		const storeAddress = await prisma.userAddress.findUnique({
			where: {
				userId,
			},
		});
		const { country, ...rest } = address;
		if (!storeAddress) {
			const newAddress = await prisma.userAddress.create({
				data: {
					...rest,
					userId,
					countryId: country,
				},
			});
			return newAddress;
		}

		const updatedAddress = await prisma.userAddress.update({
			where: {
				userId,
			},
			data: {
				...rest,
				userId,
				countryId: country,
			},
		});
		return updatedAddress;
	} catch (error) {
		console.log(error);
		throw new Error('No se pudo grabar la dirección');
	}
};
