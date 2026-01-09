'use server';

import { prisma } from '@/src/lib/prisma';

export const removeUserAddress = async (userId: string) => {
	try {
		const address = await prisma.userAddress.delete({ where: { userId } });

		if (!address) throw new Error('El usuario no tiene dirección guardada ');
		return {
			ok: true,
			msg: 'Se eliminó la dirección',
		};
	} catch (error: any) {
		console.log('No se pudo eliminar la dirección', error);
		return {
			ok: false,
			msg: error.message ?? 'No se pudo eliminar la dirección',
		};
	}
};
