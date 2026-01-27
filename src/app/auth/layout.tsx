import { auth } from '@/src/auth.config';
import { redirect } from 'next/navigation';

export default async function ShopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (session?.user) {
		redirect('/');
	}
	return (
		<main className='flex h-screen w-full items-center justify-center'>
			<div className='flex w-full items-center justify-center px-10 sm:w-87.5'>
				{children}
			</div>
		</main>
	);
}
