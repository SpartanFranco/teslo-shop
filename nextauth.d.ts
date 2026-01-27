import { DefaultSession } from 'next-auth';
import { Role } from '@/src/generated/prisma/enums';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			name: string;
			email: string;
			emailVerified?: boolean;
			role: Role;
			image?: string;
		} & DefaultSession['user'];
	}
}
