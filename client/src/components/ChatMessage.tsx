import { useUserStore } from '@/store/user';
import { Message } from '@/types/message';

interface ChatMessageProps {
	message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
	const currentUser = useUserStore((state) => state.user);

	return (
		<div
			className={`w-full flex flex-col ${
				currentUser === message.sender.username && 'ml-auto items-end'
			}`}
		>
			<small className='px-3 text-dark-500'>
				{currentUser === message.sender.username
					? 'You'
					: message.sender.username}
			</small>
			<p
				className={`bg-dark-300 size-fit p-2 px-3 rounded-2xl ${
					currentUser === message.sender.username && 'text-end'
				}`}
				style={{ whiteSpace: 'pre-wrap' }}
			>
				{message.message}
			</p>
		</div>
	);
}
