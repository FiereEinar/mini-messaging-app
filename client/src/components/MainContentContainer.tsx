import { PropsWithChildren } from 'react';

export default function MainContentContainer({ children }: PropsWithChildren) {
	return (
		<div className='flex-grow bg-dark-100 flex h-[90dvh] flex-col items-center'>
			<div className='flex flex-col w-full sm:w-[30rem] h-full pb-3'>
				{children}
			</div>
		</div>
	);
}
