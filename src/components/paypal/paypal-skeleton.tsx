export const PayPalSkeleton = () => {
	return (
		<div className='space-y-3'>
			{[1, 2, 3].map((i) => (
				<div
					key={i}
					className='h-11 w-full animate-pulse rounded-md bg-gray-200'
				/>
			))}
			<div className='mx-auto h-6 w-28 animate-pulse rounded-md bg-gray-200' />
		</div>
	);
};
