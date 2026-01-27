export const ProductGridItemSkeleton = () => {
	return (
		<div className='animate-pulse overflow-hidden rounded-md'>
			<div className='h-62.5 w-full rounded bg-gray-300 xl:h-140' />

			<div className='flex flex-col gap-2 p-4'>
				<div className='h-4 w-3/4 rounded bg-gray-300' />
				<div className='h-4 w-1/4 rounded bg-gray-300' />
			</div>
		</div>
	);
};
