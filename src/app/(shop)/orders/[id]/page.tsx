import {
	OrderStatus,
	ProductImage,
	PypalButton,
	Title,
} from '@/src/components';

import { getOrderById } from '@/src/actions';
import { redirect } from 'next/navigation';
import { currencyFormat } from '@/src/utils';

interface Props {
	params: Promise<{
		id: string;
	}>;
}

export default async function OrderByIdPage({ params }: Props) {
	const { id } = await params;
	const { ok, order } = await getOrderById(id);

	if (!ok) {
		redirect('/');
	}

	return (
		<div className='flex items-center justify-center px-10 sm:px-0'>
			<div className='flex w-250 flex-col'>
				<Title title={`Orden #${id.split('-').at(-1)}`} />

				<div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
					{/* Carrito */}
					<div className='mt-5 flex flex-col'>
						<OrderStatus isPaid={order?.isPaid ?? false} />

						{/* Items */}
						{order?.orderItems.map((product) => (
							<div
								key={product.slug}
								className='mb-5 flex'
							>
								<ProductImage
									src={product.productImage[0].url}
									width={100}
									height={100}
									style={{
										width: '100px',
										height: '100px',
									}}
									alt={product.title}
									className='mr-5 rounded'
								/>

								<div>
									<p>{product.title}</p>
									<p>
										${product.price} x {product.quantity}
									</p>
									<p className='font-bold'>
										Subtotal: ${product.price * product.quantity}
									</p>
								</div>
							</div>
						))}
					</div>

					{/* Checkout - Resumen de orden */}
					<div className='rounded-xl bg-white p-7 shadow-xl'>
						<h2 className='mb-2 text-2xl'>Dirección de entrega</h2>
						<div className='mb-10'>
							<p className='text-xl'>
								{order?.address?.firstName} {order?.address?.lastName}
							</p>
							<p>{order?.address?.address}</p>
							<p>{order?.address?.address2}</p>
							<p>{order?.address?.postalCode}</p>
							<p>
								{order?.address?.city},{order?.address?.country.name}
							</p>

							<p>{order?.address?.phone}</p>
						</div>

						{/* Divider */}
						<div className='mb-10 h-0.5 w-full rounded bg-gray-200' />

						<h2 className='mb-2 text-2xl'>Resumen de orden</h2>

						<div className='grid grid-cols-2'>
							<span>No. Productos</span>
							<span className='text-right'>
								{order?.itemsInOrder === 1
									? '1 artículo'
									: `${order?.itemsInOrder} artículos`}
							</span>

							<span>Subtotal</span>
							<span className='text-right'>
								{currencyFormat(order?.subTotal ?? 0)}
							</span>

							<span>Impuestos (15%)</span>
							<span className='text-right'>
								{currencyFormat(order?.tax ?? 0)}
							</span>

							<span className='mt-5 text-2xl'>Total:</span>
							<span className='mt-5 text-right text-2xl'>
								{currencyFormat(order?.total ?? 0)}
							</span>
						</div>

						{order?.isPaid ? (
							<OrderStatus isPaid={order?.isPaid ?? false} />
						) : (
							<PypalButton
								amount={order!.total}
								orderId={order!.id}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
