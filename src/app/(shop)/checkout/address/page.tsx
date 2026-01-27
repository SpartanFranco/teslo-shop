import { Title } from '@/src/components';
import { AddressForm } from './ui/address-form';
import { getCountries, getUserAddress } from '@/src/actions';
import { auth } from '@/src/auth.config';

export default async function AddressPage() {
	const session = await auth();

	if (!session?.user) {
		return <h3 className='text-5xl'>500 - No hay sesión de usuario</h3>;
	}

	const countries = await getCountries();
	const userAddress = (await getUserAddress(session.user.id)) ?? undefined;
	return (
		<div className='flex flex-col px-10 sm:items-center sm:justify-center sm:px-0'>
			<div className='flex w-full flex-col justify-center text-left xl:w-250'>
				<Title
					title='Dirección'
					subtitle='Dirección de entrega'
				/>

				<AddressForm
					countries={countries}
					userStoreAddress={userAddress}
				/>
			</div>
		</div>
	);
}
