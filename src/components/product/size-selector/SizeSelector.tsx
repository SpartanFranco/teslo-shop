import type { Size } from '@/src/interfaces';
import clsx from 'clsx';

interface Props {
	selectedSize?: Size;
	availableSizes: Size[]; // ['SX', 'M', 'XL', 'XXL']
	onSizeChange: (size: Size) => void;
}

export const SizeSelector = ({
	selectedSize,
	availableSizes,
	onSizeChange,
}: Props) => {
	return (
		<div className='my-5'>
			<h3 className='mb-4 font-bold'>Tallas disponibles</h3>

			<div className='flex'>
				{availableSizes.map((size) => (
					<button
						key={size}
						onClick={() => onSizeChange(size)}
						className={clsx('mx-2 text-lg hover:underline', {
							underline: size === selectedSize,
						})}
					>
						{size}
					</button>
				))}
			</div>
		</div>
	);
};
