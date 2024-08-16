import { socket } from '@/socket';
import { useEffect } from 'react';

export default function useSocket(event: string, fn: () => void): void {
	useEffect(() => {
		socket.on(event, () => {
			fn();
		});

		return () => {
			socket.off(event);
		};
	}, [event, fn]);
}
