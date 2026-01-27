'use server';

import { auth } from '@/src/auth.config';
import { prisma } from '@/src/lib/prisma';

interface PaginateOptions {
	page?: number;
	take?: number;
}

export const getPaginateUsers = async ({
	page = 1,
	take = 12,
}: PaginateOptions) => {
	if (isNaN(Number(page))) page = 1;
	if (page < 1) page = 1;

	const session = await auth();
	if (!session?.user && session?.user.role !== 'admin') {
		return {
			ok: false,
			message: 'Debe estar autenticado y debe ser administrador ',
		};
	}

	const users = await prisma.user.findMany({
		take,
		skip: (page - 1) * take,
		orderBy: { name: 'desc' },
	});
	const countUsers = await prisma.user.count();
	const totalPages = Math.ceil(countUsers / take) ?? 1;
	return {
		ok: true,
		users,
		totalPages,
	};
};
