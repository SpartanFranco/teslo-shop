import { titleFont } from '@/src/config/fonts';

interface Props {
	title: string;
	subtitle?: string;
	className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
	return (
		<div className={`mt-3 ${className}`}>
			<h1
				className={`${titleFont.className} my-7 text-2xl font-semibold antialiased md:text-4xl`}
			>
				{title}
			</h1>

			{subtitle && <h3 className='tex-lg mb-5 md:text-xl'>{subtitle}</h3>}
		</div>
	);
};
