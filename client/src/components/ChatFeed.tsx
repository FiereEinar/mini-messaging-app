import { fetchMessages } from '@/api/messages';
import { useQuery } from '@tanstack/react-query';
import ChatMessage from './ChatMessage';
import { useEffect, useRef } from 'react';
import { socket } from '@/socket';

export default function ChatFeed() {
	const bottomRef = useRef<HTMLDivElement>(null);
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['messages'],
		queryFn: fetchMessages,
	});

	useEffect(() => {
		socket.on('message_sent', () => {
			console.log('recieved a message emit event');
			refetch();
		});

		return () => {
			socket.off('message_sent');
		};
	}, [refetch]);

	useEffect(() => {
		if (data && bottomRef.current) {
			bottomRef.current.scrollIntoView();
		}
	}, [data]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>An error occured while fetching messages</p>;
	}

	return (
		<div className='flex flex-col overflow-y-scroll gap-3 p-3'>
			{data?.map((message) => (
				<ChatMessage key={message.id} message={message} />
			))}
			<div ref={bottomRef} />
		</div>
	);
}
