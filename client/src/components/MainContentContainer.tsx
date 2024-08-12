import { PropsWithChildren } from 'react';

export default function MainContentContainer({ children }: PropsWithChildren) {
	return (
		<div className='flex-grow flex flex-col items-center'>
			<div className='border flex flex-col w-[30rem] h-full p-3'>
				{children}
			</div>
		</div>
	);
}
