import { titleFont } from '@/src/config/fonts';
import { RegisterForm } from './ui/register-form';

export default function NewAccountPage() {
	return (
		<div className='flex flex-col'>
			<h1 className={`${titleFont.className} mb-5 text-4xl`}>Nueva cuenta</h1>

			<RegisterForm />
		</div>
	);
}
