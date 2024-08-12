import { messageSchema } from '@/lib/validations/messageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

export default function CreateMessageForm() {
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
			const BASE_API_URL: string = import.meta.env.VITE_BASE_API_URL;
			const formData = {
				message: data.message,
				sender: 'Admin',
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
				<Textarea
					{...register('message')}
					rows={1}
					placeholder='Send a message...'
				/>
				<Button disabled={isSubmitting}>Send</Button>
			</form>
			{errors.root && (
				<small className='text-red-500'>{errors.root.message}</small>
			)}
		</>
	);
}
