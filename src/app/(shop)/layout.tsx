import { getCategories } from '@/src/actions';
import { Footer, Sidebar, TopMenu } from '@/src/components';

export default async function ShopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const categories = await getCategories();

	return (
		<main className='grid h-screen grid-rows-[5rem_1fr_3rem] overflow-auto'>
			<div>
				<TopMenu categories={categories} />
				<Sidebar />
			</div>

			<div className='px-2 sm:px-10'>{children}</div>

			<Footer />
		</main>
	);
}
