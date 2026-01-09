'use client';

import { CirclePlus, MinusCircle } from 'lucide-react';

interface Props {
	quantity: number;
	onChangeQuantity: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onChangeQuantity }: Props) => {
	const onValueChanged = (value: number) => {
		if (quantity + value < 1) return;

		onChangeQuantity(quantity + value);
	};

	return (
		<div className='flex'>
			<button onClick={() => onValueChanged(-1)}>
				<MinusCircle size={30} />
			</button>

			<span className='mx-3 w-20 rounded bg-gray-100 px-5 text-center'>
				{quantity}
			</span>

			<button onClick={() => onValueChanged(+1)}>
				<CirclePlus size={30} />
			</button>
		</div>
	);
};
