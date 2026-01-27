import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	// solo protegemos /admin
	if (!req.auth && req.nextUrl.pathname.startsWith('/admin')) {
		const loginUrl = new URL('/auth/login', req.nextUrl.origin);
		return Response.redirect(loginUrl);
	}
});

export const config = {
	matcher: ['/admin/:path*'],
};
