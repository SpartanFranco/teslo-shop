import clsx from 'clsx';
import { CreditCard } from 'lucide-react';

interface Props {
	isPaid: boolean;
}
export const OrderStatus = ({ isPaid }: Props) => {
	return (
		<div
			className={clsx(
				'mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold text-white',
				{
					'bg-red-500': !isPaid,
					'bg-green-700': isPaid,
				},
			)}
		>
			<CreditCard size={30} />

			<span className='mx-2'>{isPaid ? 'Pagada' : 'No pagada'}</span>
		</div>
	);
};
