'use server';

import { PaypalOrderStatusResponse } from '@/src/interfaces';
import { prisma } from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

export const paypalCheckPayment = async (paypalTransactionId: string) => {
	const authToken = await getPayPalBearerToken();

	if (!authToken) {
		return {
			ok: false,
			message: 'No se pudo obtener el token de verificación',
		};
	}

	const resp = await verifyPayPalPayment(paypalTransactionId, authToken);

	if (!resp) {
		return {
			ok: false,
			message: 'Erro al verificar el pago',
		};
	}

	const { purchase_units, status } = resp;

	const { invoice_id } = purchase_units[0]; // TODO: invoice ID
	if (status !== 'COMPLETED') {
		return {
			ok: false,
			message: 'Aún no se ha pagado en PayPal ',
		};
	}

	try {
		console.log({ purchase_units });

		await prisma.order.update({
			where: {
				id: invoice_id,
			},
			data: {
				isPaid: true,
				paidAt: new Date(),
			},
		});

		revalidatePath(`/orders/${invoice_id}`);
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: '500- No se pudo realizar el pago',
		};
	}
};

const getPayPalBearerToken = async (): Promise<string | null> => {
	const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
	const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
	const oauth2URL = process.env.PAYPAL_OAUTH_URL ?? '';

	const base64Token = Buffer.from(
		`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
		'utf-8',
	).toString('base64');

	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
	myHeaders.append('Authorization', `Basic ${base64Token}`);

	const urlencoded = new URLSearchParams();
	urlencoded.append('grant_type', 'client_credentials');

	const requestOptions: RequestInit = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded,
		redirect: 'follow',
	};

	try {
		const result = await fetch(oauth2URL, requestOptions).then((res) =>
			res.json(),
		);
		return result.access_token;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const verifyPayPalPayment = async (
	paypalTransactionId: string,
	bearerToken: string,
): Promise<PaypalOrderStatusResponse | null> => {
	const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

	const myHeaders = new Headers();
	myHeaders.append('Authorization', `Bearer ${bearerToken}`);

	const requestOptions: RequestInit = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow',
		cache: 'no-store',
	};

	try {
		const response = await fetch(paypalOrderUrl, requestOptions).then(
			(response) => response.json(),
		);
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
};
