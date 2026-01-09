import { titleFont } from '@/src/config/fonts';
import { LoginForm } from './ui/login-form';

export default function LoginPage() {
	return (
		<div className='flex flex-col'>
			<h1 className={`${titleFont.className} mb-5 text-4xl`}>Ingresar</h1>

			<LoginForm />
		</div>
	);
}
