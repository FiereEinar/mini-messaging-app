import axios from 'axios';

const BASE_API_URL: string =
	import.meta.env.VITE_DEV_TYPE === 'host'
		? import.meta.env.VITE_BASE_API_URL_HOST
		: import.meta.env.VITE_BASE_API_URL;

const axiosInstance = axios.create({
	baseURL: BASE_API_URL,
	withCredentials: true,
});

export default axiosInstance;
