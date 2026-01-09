import clsx from 'clsx';
import Link from 'next/link';

interface Props {
	href: string;
	icon: React.ReactNode;
	label: string;
	active: boolean;
	onClick?: () => void;
}
export const SidebarLink = ({ href, icon, label, active, onClick }: Props) => (
	<Link
		href={href}
		onClick={onClick}
		className={clsx(
			'flex items-center gap-3 rounded-lg px-3 py-2 transition',
			active
				? 'bg-gray-900 text-white'
				: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
		)}
	>
		{icon}
		<span className='text-base'>{label}</span>
	</Link>
);
