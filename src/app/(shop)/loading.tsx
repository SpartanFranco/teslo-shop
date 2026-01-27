import { ProductGridSkeleton } from '@/src/components';

export default function LoadingPage() {
	return (
		<>
			<div className='mt-3 animate-pulse'>
				<div className='my-7 h-8 w-[20rem] rounded bg-gray-300 md:h-10' />

				<div className='mb-5 h-5 w-48 rounded bg-gray-300 md:h-6' />
			</div>
			<ProductGridSkeleton count={12} />
		</>
	);
}
