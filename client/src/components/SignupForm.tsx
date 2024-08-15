import { FieldValues, useForm } from 'react-hook-form';
import InputField from './InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/lib/validations/userSchema';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import HeaderText from './ui/header-text';
import axiosInstance from '@/api/axiosInstance';
import ErrorText from './ui/error-text';

export default function SignupForm() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(signupSchema),
	});

	const onFormSubmit = async (data: FieldValues) => {
		try {
			const result = await axiosInstance.post('/auth/signup', data);

			if (!result.data.success) {
				setError('root', { message: result.data.message });
				return;
			}

			navigate('/login');
		} catch (err) {
			setError('root', { message: 'Failed to sign you up' });
			console.error('Failed to sign up', err);
		}
	};

	return (
		<div className='bg-dark text-white w-screen h-screen flex justify-center items-center'>
			<div className='flex flex-col gap-3'>
				<HeaderText>Sign up</HeaderText>
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

					<InputField
						type='confirmPassword'
						errors={errors}
						registerFn={register}
						name='confirmPassword'
						id='confirmPassword'
						label='Confirm Password:'
					/>

					<Link to='/login'>
						<p className='text-xs italic underline text-dark-500'>Log in</p>
					</Link>

					{errors.root && errors.root.message && (
						<ErrorText message={errors.root.message} />
					)}

					<div className='flex justify-end'>
						<Button disabled={isSubmitting} type='submit'>
							Submit
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
