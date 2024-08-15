import { FieldValues, useForm } from 'react-hook-form';
import InputField from './InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validations/userSchema';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import HeaderText from './ui/header-text';

export default function SignupForm() {
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
			console.log(data);
		} catch (err) {
			setError('root', { message: 'Failed to log you in' });
			console.error('Failed to log in', err);
		}
	};

	return (
		<div className='bg-dark text-white w-screen h-screen flex justify-center items-center'>
			<div className='flex flex-col gap-3'>
				<HeaderText>Signup</HeaderText>
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
