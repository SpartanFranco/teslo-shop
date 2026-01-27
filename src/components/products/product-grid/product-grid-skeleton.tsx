import { ProductGridItemSkeleton } from './product-grid-item-skeleton';

interface Props {
	count?: number;
}

export const ProductGridSkeleton = ({ count = 6 }: Props) => {
	return (
		<div className='mb-10 grid grid-cols-2 gap-10 sm:grid-cols-3'>
			{Array.from({ length: count }).map((_, index) => (
				<ProductGridItemSkeleton key={index} />
			))}
		</div>
	);
};
