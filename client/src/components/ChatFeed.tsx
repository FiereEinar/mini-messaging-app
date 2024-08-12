import { fetchMessages } from '@/api/messages';
import { useUserStore } from '@/store/user';
import { useQuery } from '@tanstack/react-query';

export default function ChatFeed() {
	const currentUser = useUserStore((state) => state.user);
	const { data, isLoading, error } = useQuery({
		queryKey: ['messages'],
		queryFn: fetchMessages,
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>An error occured while fetching messages</p>;
	}

	return (
		<div className='flex flex-col flex-grow gap-3'>
			{data?.map((message) => (
				<div
					className={`${currentUser === message.sender && 'ml-auto'}`}
					key={message.id}
				>
					<p style={{ whiteSpace: 'pre-wrap' }}>{message.message}</p>
					<small>
						By: {currentUser === message.sender ? 'You' : message.sender} on{' '}
						{new Date(message.date).toLocaleDateString()}
					</small>
				</div>
			))}
		</div>
	);
}
