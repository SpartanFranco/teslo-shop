import type { Metadata } from 'next';
import { inter } from '@/src/config/fonts';

import './globals.css';
import { Providers } from '@/src/components/provide/providers';

export const metadata: Metadata = {
	title: {
		template: '%s - Teslo | Shop',
		default: 'Teslo | Shop',
	},
	description: 'Una tienda virtual de productos',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
