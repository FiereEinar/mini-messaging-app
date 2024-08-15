import { FieldValues, useForm } from 'react-hook-form';
import InputField from './InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validations/userSchema';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import HeaderText from './ui/header-text';
import axiosInstance from '@/api/axiosInstance';
import ErrorText from './ui/error-text';
import { useUserStore } from '@/store/user';

export default function LoginForm() {
	const setUser = useUserStore((state) => state.setUser);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(loginSchema),
	});

	const onFormSubmit = async (data: FieldValues) => {
		try {
			const result = await axiosInstance.post('/auth/login', data);

			if (!result.data.success) {
				setError('root', { message: result.data.message });
				return;
			}

			setUser(result.data?.data?.username);

			navigate('/');
		} catch (err) {
			setError('root', { message: 'Failed to log you in' });
			console.error('Failed to log in', err);
		}
	};

	return (
		<div className='bg-dark text-white w-screen h-screen flex justify-center items-center'>
			<div className='flex flex-col gap-3'>
				<HeaderText>Login</HeaderText>
				<form
					onSubmit={handleSubmit(onFormSubmit)}
					className='flex flex-col gap-2'
				>
					<InputField
						type='text'
						errors={errors}
						registerFn={register}
						name='username'
						id='username'
						label='Username:'
					/>

					<InputField
						type='password'
						errors={errors}
						registerFn={register}
						name='password'
						id='password'
						label='Password:'
					/>

					<Link to='/signup'>
						<p className='text-xs italic underline text-dark-500'>Sign up</p>
					</Link>

					{errors.root && errors.root.message && (
						<ErrorText message={errors.root.message} />
					)}

					<div className='flex justify-end'>
						<Button variant='secondary' disabled={isSubmitting} type='submit'>
							Submit
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
