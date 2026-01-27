declare module '*.module.css' {
	const classes: { readonly [key: string]: string };
	export default classes;
}

declare module '*.css';

// Swiper CSS
declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/free-mode';
declare module 'swiper/css/thumbs';
declare module 'swiper/css/autoplay';
declare module 'swiper/css/pagination';
