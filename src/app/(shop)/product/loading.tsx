export default function LoadingPage() {
	return (
		<div className='mt-5 mb-20 grid animate-pulse grid-cols-1 gap-3 md:grid-cols-3'>
			<div className='col-span-1 md:col-span-2'>
				<div className='h-125 w-full rounded-lg bg-gray-300 xl:h-200' />

				<div className='mt-4 hidden gap-2 md:flex'>
					{Array.from({ length: 2 }).map((_, i) => (
						<div
							key={i}
							className='size-24 rounded-lg bg-gray-300 xl:size-80'
						/>
					))}
				</div>
			</div>

			{/* Detalles */}
			<div className='col-span-1 px-5'>
				{/* Stock label */}
				<div className='mb-2 h-4 w-24 rounded bg-gray-300' />

				{/* Title */}
				<div className='mb-3 h-6 w-3/4 rounded bg-gray-300' />

				{/* Price */}
				<div className='mb-5 h-5 w-1/3 rounded bg-gray-300' />

				{/* Add to cart */}
				<div className='mb-6 h-12 w-full rounded bg-gray-300' />

				{/* Descripción */}
				<div className='mb-2 h-4 w-32 rounded bg-gray-300' />
				<div className='space-y-2'>
					<div className='h-3 w-full rounded bg-gray-300' />
					<div className='h-3 w-full rounded bg-gray-300' />
					<div className='h-3 w-5/6 rounded bg-gray-300' />
				</div>
			</div>
		</div>
	);
}
