'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';

import { titleFont } from '@/src/config/fonts';
import { useCartStore, useUIStore } from '@/src/store';
import { useLoaded } from '@/src/hooks';
import type { Gender } from '@/src/interfaces';

type CategoryGender = Exclude<Gender, 'unisex'>;

const categoriesPath: Record<CategoryGender, string> = {
	men: 'Hombres',
	women: 'Mujeres',
	kid: 'Niños',
};

export const TopMenu = () => {
	const openSideMenu = useUIStore((state) => state.openSideMenu);
	const totalItems = useCartStore((state) => state.getTotalItems());

	const isLoaded = useLoaded();
	const pathname = usePathname();

	return (
		<nav className='flex w-full items-center justify-between px-5'>
			{/* Logo */}
			<Link
				href='/'
				className='flex items-center gap-1'
			>
				<span className={`${titleFont.className} font-bold antialiased`}>
					Teslo
				</span>
				<span>| Shop</span>
			</Link>

			<div className='hidden items-center gap-2 sm:flex'>
				{(Object.keys(categoriesPath) as CategoryGender[]).map((c) => {
					const href = `/gender/${c}`;
					const isActive = pathname === href;

					return (
						<Link
							key={c}
							href={href}
							className={`rounded-md px-3 py-2 text-sm transition-all ${
								isActive
									? 'bg-gray-900 text-white'
									: 'text-gray-700 hover:bg-gray-100'
							}`}
						>
							{categoriesPath[c]}
						</Link>
					);
				})}
			</div>

			{/* Actions */}
			<div className='flex items-center'>
				{/* <Link
					href='/search'
					className='mx-2'
				>
					<Search className='h-5 w-5' />
				</Link> */}

				<Link
					href={totalItems === 0 && isLoaded ? '/empty' : '/cart'}
					className='mx-2'
				>
					<div className='relative'>
						{isLoaded && totalItems !== 0 && (
							<span className='fade-in absolute -top-2 -right-2 rounded-full bg-blue-700 px-1 text-xs font-bold text-white'>
								{totalItems}
							</span>
						)}
						<ShoppingCart className='h-5 w-5' />
					</div>
				</Link>

				<button
					onClick={openSideMenu}
					className='m-2 rounded-md px-3 py-2 text-sm transition-all hover:bg-gray-100'
				>
					Menú
				</button>
			</div>
		</nav>
	);
};
