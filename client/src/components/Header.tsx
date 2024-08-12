import { useUserStore } from '@/store/user';

export default function Header() {
	const currentUser = useUserStore((state) => state.user);

	return (
		<header className='p-3 border-b flex justify-between'>
			<div className='flex items-center'>
				<h1 className='text-2xl font-semibold'>Mini.M</h1>
			</div>

			<div className='flex items-center'>
				<p>Entered as: {currentUser}</p>
			</div>
		</header>
	);
}
