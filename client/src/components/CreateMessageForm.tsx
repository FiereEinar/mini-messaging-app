import { messageSchema } from '@/lib/validations/messageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { useUserStore } from '@/store/user';
import { Input } from './ui/input';
import { createMessage } from '@/api/messages';
import { socket } from '@/socket';
import { z } from 'zod';
import ErrorText from './ui/error-text';

type FormValues = z.infer<typeof messageSchema>;

export default function CreateMessageForm() {
	const currentUser = useUserStore((state) => state.user);
	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({ resolver: zodResolver(messageSchema) });

	const onSubmitHandler = async (data: FieldValues) => {
		try {
			if (!currentUser) {
				setError('root', { message: 'Current user name is empty' });
				return;
			}

			const formData = {
				message: data.message,
				sender: currentUser,
			};

			const result = await createMessage(formData);

			if (!result?.success) {
				setError('root', { message: result.message });
				return;
			}

			socket.emit('message');
			reset();
		} catch (err) {
			setError('root', { message: 'Failed to send message' });
			console.error('Failed to send message', err);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
				className='flex flex-shrink-0 px-3'
			>
				<Input
					{...register('message')}
					className='bg-dark-200 border-dark-400 rounded-r-none'
					placeholder='Send a message...'
				/>
				<Button
					className='rounded-l-none'
					variant='secondary'
					disabled={isSubmitting}
				>
					Send
				</Button>
			</form>
			{errors.root && errors.root.message && (
				<ErrorText message={errors.root.message} />
			)}
		</>
	);
}
