import { io } from 'socket.io-client';

const URL =
	import.meta.env.VITE_DEV_TYPE === 'host'
		? import.meta.env.VITE_BASE_API_URL_HOST
		: import.meta.env.VITE_BASE_API_URL;

export const socket = io(URL);
