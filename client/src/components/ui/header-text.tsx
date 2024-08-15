import { PropsWithChildren } from 'react';

export default function HeaderText({ children }: PropsWithChildren) {
	return <h1 className='text-3xl font-bold'>{children}</h1>;
}
