export const ProductsInCartSkeleton = () => {
	return (
		<div className='animate-pulse'>
			{Array.from({ length: 3 }).map((_, i) => (
				<div
					key={i}
					className='mb-5 flex gap-2'
				>
					{/* Imagen */}
					<div className='size-24 rounded bg-gray-300' />

					{/* Info */}
					<div className='flex flex-1 flex-col gap-1'>
						<div className='h-4 w-3/4 rounded bg-gray-300' />
						<div className='h-4 w-1/4 rounded bg-gray-300' />

						{/* Quantity selector */}
						<div className='mt-2 h-8 w-32 rounded bg-gray-300' />

						{/* Remove */}
						<div className='mt-3 h-4 w-20 rounded bg-gray-300' />
					</div>
				</div>
			))}
		</div>
	);
};
