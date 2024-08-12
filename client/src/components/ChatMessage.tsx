import { useUserStore } from '@/store/user';
import { Message } from '@/types/message';

interface ChatMessageProps {
	message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
	const currentUser = useUserStore((state) => state.user);

	return (
		<div className={`${currentUser === message.sender && 'ml-auto'}`}>
			<p style={{ whiteSpace: 'pre-wrap' }}>{message.message}</p>
			<small>
				By: {currentUser === message.sender ? 'You' : message.sender} on{' '}
				{new Date(message.date).toLocaleDateString()}
			</small>
		</div>
	);
}
