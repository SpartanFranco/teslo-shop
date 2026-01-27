'use server';

import { prisma } from '@/src/lib/prisma';

export const getCountries = async () => {
	try {
		const countries = await prisma.country.findMany({
			orderBy: {
				name: 'desc',
			},
		});

		return countries;
	} catch (error) {
		console.log('Error al obtener los países', error);
		return [];
	}
};
