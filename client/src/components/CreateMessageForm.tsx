import { messageSchema } from '@/lib/validations/messageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { Button } from './ui/button';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/store/user';
import { Input } from './ui/input';

export default function CreateMessageForm() {
	const currentUser = useUserStore((state) => state.user);
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(messageSchema) });

	const onSubmitHandler = async (data: FieldValues) => {
		try {
			if (!currentUser) {
				setError('root', { message: 'Current user name is empty' });
				return;
			}

			const BASE_API_URL: string = import.meta.env.VITE_BASE_API_URL;
			const formData = {
				message: data.message,
				sender: currentUser,
			};

			const { data: result } = await axios.post(
				`${BASE_API_URL}/messages`,
				formData
			);

			if (!result.success) {
				setError('root', { message: result.message });
				return;
			}

			reset();
			queryClient.invalidateQueries({ queryKey: ['messages'] });
		} catch (err) {
			setError('root', { message: 'Failed to send message' });
			console.error('Failed to send message', err);
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmitHandler)} className='flex gap-1'>
				<Input {...register('message')} placeholder='Send a message...' />
				<Button disabled={isSubmitting}>Send</Button>
			</form>
			{errors.root && (
				<small className='text-red-500'>{errors.root.message}</small>
			)}
		</>
	);
}
