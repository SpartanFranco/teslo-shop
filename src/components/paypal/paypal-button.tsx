'use client';

import {
	PayPalButtons,
	usePayPalScriptReducer,
	type PayPalButtonsComponentProps,
} from '@paypal/react-paypal-js';
import { PayPalSkeleton } from './paypal-skeleton';
import { paypalCheckPayment, setTransactionId } from '@/src/actions';

interface Props {
	orderId: string;
	amount: number;
}
export const PypalButton = ({ orderId, amount }: Props) => {
	const [{ isPending }] = usePayPalScriptReducer();
	const roundedAmout = Math.round(amount * 100) / 100;

	if (isPending) {
		return <PayPalSkeleton />;
	}

	const createOrder: PayPalButtonsComponentProps['createOrder'] = async (
		data,
		actions,
	) => {
		const transactioId = await actions.order.create({
			intent: 'CAPTURE',

			purchase_units: [
				{
					amount: {
						value: `${roundedAmout}`,
						currency_code: 'USD',
					},
					invoice_id: orderId,
				},
			],
		});

		const { ok } = await setTransactionId(orderId, transactioId);

		if (!ok) {
			throw new Error('No se pudo actualizar la orden');
		}
		return transactioId;
	};
	const onApprove: PayPalButtonsComponentProps['onApprove'] = async (
		data,
		actions,
	) => {
		console.log('onaprove');
		const details = await actions.order?.capture();
		if (!details?.id) return;

		await paypalCheckPayment(details.id);
	};

	return (
		<div className='relative z-0'>
			<PayPalButtons
				createOrder={createOrder}
				onApprove={onApprove}
			/>
		</div>
	);
};
