import { useNavigate } from 'react-router-dom';
import ChatFeed from './components/ChatFeed';
import CreateMessageForm from './components/CreateMessageForm';
import Header from './components/Header';
import MainContentContainer from './components/MainContentContainer';
import { useUserStore } from './store/user';

function App() {
	const currentUser = useUserStore((state) => state.user);
	const navigate = useNavigate();

	console.log(currentUser);

	if (!currentUser) {
		navigate('/login');
	}

	return (
		<main className='relative flex flex-col text-white h-dvh'>
			<Header />
			<MainContentContainer>
				{/* <ChatFeed /> */}
				<CreateMessageForm />
			</MainContentContainer>
		</main>
	);
}

export default App;
