import { fetchMessages } from '@/api/messages';
import { useQuery } from '@tanstack/react-query';
import ChatMessage from './ChatMessage';
import { useEffect, useRef } from 'react';
import { isDateEqual } from '@/lib/utils';
import useSocket from '@/hooks/useSocket';

export default function ChatFeed() {
	const bottomRef = useRef<HTMLDivElement>(null);
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['messages'],
		queryFn: fetchMessages,
	});

	useSocket('message_sent', () => {
		refetch();
	});

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
		<div className='flex flex-grow flex-col overflow-y-scroll gap-3 p-3'>
			{data?.map((message, i, messages) => (
				<div className='flex flex-col items-center' key={message.id}>
					{i !== 0 && !isDateEqual(message.date, messages[i - 1].date) && (
						<p className='m-auto text-dark-500'>
							{new Date(message.date).toLocaleDateString()}
						</p>
					)}
					<ChatMessage message={message} />
				</div>
			))}
			<div ref={bottomRef} />
		</div>
	);
}
