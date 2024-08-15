import { useNavigate } from 'react-router-dom';
import ChatFeed from './components/ChatFeed';
import CreateMessageForm from './components/CreateMessageForm';
import Header from './components/Header';
import MainContentContainer from './components/MainContentContainer';
import { useUserStore } from './store/user';
import { useEffect } from 'react';

function App() {
	const currentUser = useUserStore((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser) {
			navigate('/login');
		}
	}, [currentUser, navigate]);

	return (
		<main className='relative flex flex-col text-white h-dvh'>
			<Header />
			<MainContentContainer>
				<ChatFeed />
				<CreateMessageForm />
			</MainContentContainer>
		</main>
	);
}

export default App;
