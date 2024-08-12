import { fetchMessages } from '@/api/messages';
import { useQuery } from '@tanstack/react-query';
import ChatMessage from './ChatMessage';

export default function ChatFeed() {
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
				<ChatMessage message={message} />
			))}
		</div>
	);
}
