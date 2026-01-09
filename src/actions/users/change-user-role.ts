'use server';

import { auth } from '@/src/auth.config';
import { User } from '@/src/interfaces';
import { prisma } from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

export const changeUserRole = async (userId: string, role: string) => {
	const session = await auth();
	if (!session?.user && session?.user.role !== 'admin') {
		return {
			ok: false,
			message: 'Debe estar autenticado y debe ser administrador ',
		};
	}
	try {
		const newRole: User['role'] = role == 'admin' ? 'admin' : 'user';

		await prisma.user.update({
			where: {
				id: userId,
			},
			data: { role: newRole },
		});

		revalidatePath('/admin/users');
		return {
			ok: true,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'No se pudo cambiar el role,revisar logs',
		};
	}
};
