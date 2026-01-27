'use client';

import clsx from 'clsx';
import {
	X,
	LogIn,
	LogOut,
	Users,
	CircleUserRound,
	Shirt,
	Tag,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import { useUIStore } from '@/src/store';
import { useSession } from 'next-auth/react';
import { logout } from '@/src/actions';
import { SidebarLink } from './sidebar-link';

export const Sidebar = () => {
	const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
	const closeMenu = useUIStore((state) => state.closeSideMenu);
	const { data: session } = useSession();
	const pathname = usePathname();

	const isAuthenticated = Boolean(session?.user);
	const isAdmin = session?.user?.role === 'admin';

	const isActive = (href: string) =>
		pathname === href || pathname.startsWith(`${href}/`);

	return (
		<>
			{/* Overlay */}
			{isSideMenuOpen && (
				<div
					className='fixed inset-0 z-10 bg-black/40 backdrop-blur-sm'
					onClick={closeMenu}
				/>
			)}

			{/* Sidebar */}
			<nav
				className={clsx(
					'fixed top-0 right-0 z-20 flex h-screen w-80 flex-col bg-white px-6 py-8 shadow-xl transition-transform duration-300',
					{
						'translate-x-full': !isSideMenuOpen,
					},
				)}
			>
				<X
					size={22}
					className='absolute top-6 right-6 cursor-pointer text-gray-500 hover:text-black'
					onClick={closeMenu}
				/>

				{/* ===== Cuenta ===== */}
				{isAuthenticated && (
					<div className='space-y-2'>
						<p className='text-sm font-semibold text-gray-400 uppercase'>
							Cuenta
						</p>

						<SidebarLink
							href='/profile'
							icon={<CircleUserRound size={20} />}
							label='Perfil'
							active={isActive('/profile')}
							onClick={closeMenu}
						/>

						<SidebarLink
							href='/orders'
							icon={<Tag size={20} />}
							label='Mis órdenes'
							active={isActive('/orders')}
							onClick={closeMenu}
						/>
					</div>
				)}

				{/* ===== Auth ===== */}
				<div className='mt-6 space-y-2'>
					{isAuthenticated ? (
						<button
							onClick={async () => {
								await logout();
								closeMenu();
							}}
							className='flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900'
						>
							<LogOut size={20} />
							<span className='text-base'>Cerrar sesión</span>
						</button>
					) : (
						<SidebarLink
							href='/auth/login'
							icon={<LogIn size={20} />}
							label='Ingresar'
							active={isActive('/auth/login')}
							onClick={closeMenu}
						/>
					)}
				</div>

				{/* ===== Admin ===== */}
				{isAdmin && (
					<>
						<div className='my-6 h-px w-full bg-gray-200' />

						<div className='space-y-2'>
							<p className='text-sm font-semibold text-gray-400 uppercase'>
								Administración
							</p>

							<SidebarLink
								href='/admin/products'
								icon={<Shirt size={20} />}
								label='Productos'
								active={isActive('/admin/products')}
								onClick={closeMenu}
							/>

							<SidebarLink
								href='/admin/orders'
								icon={<Tag size={20} />}
								label='Órdenes'
								active={isActive('/admin/orders')}
								onClick={closeMenu}
							/>

							<SidebarLink
								href='/admin/users'
								icon={<Users size={20} />}
								label='Usuarios'
								active={isActive('/admin/users')}
								onClick={closeMenu}
							/>
						</div>
					</>
				)}
			</nav>
		</>
	);
};
