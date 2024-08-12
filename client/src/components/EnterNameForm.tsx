import { useUserStore } from '@/store/user';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { removeWhitespace } from '@/lib/utils';

export default function EnterNameForm() {
	const [name, setName] = useState('');
	const setUser = useUserStore((state) => state.setUser);

	const handleSubmit = () => {
		const trimmed = removeWhitespace(name).toLowerCase();
		setUser(trimmed);
	};

	return (
		<div className='absolute backdrop-blur-sm bg-dark/90 w-screen h-screen flex justify-center pt-[10rem]'>
			<div className='w-fit flex flex-col items-center gap-3'>
				<label htmlFor='name'>Enter your name:</label>
				<Input
					className='bg-dark-300'
					onChange={(e) => setName(e.target.value)}
					type='text'
					id='name'
				/>
				<Button onClick={handleSubmit}>Submit</Button>
			</div>
		</div>
	);
}
