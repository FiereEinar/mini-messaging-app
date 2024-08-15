import { useUserStore } from '@/store/user';
import { Button } from './ui/button';
import axiosInstance from '@/api/axiosInstance';

export default function LogoutButton() {
	const setUser = useUserStore((state) => state.setUser);

	const onLogout = async () => {
		try {
			await axiosInstance.get('auth/logout');
			setUser('');
		} catch (err) {
			console.error('Failed to logout', err);
		}
	};

	return (
		<Button onClick={onLogout} size='sm' variant='secondary'>
			Logout
		</Button>
	);
}
