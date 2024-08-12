import ChatFeed from './components/ChatFeed';
import CreateMessageForm from './components/CreateMessageForm';
import EnterNameForm from './components/EnterNameForm';
import Header from './components/Header';
import MainContentContainer from './components/MainContentContainer';
import { useUserStore } from './store/user';

function App() {
	const currentUser = useUserStore((state) => state.user);

	return (
		<main className={`relative flex flex-col h-dvh`}>
			{!currentUser && <EnterNameForm />}

			<Header />
			<MainContentContainer>
				<ChatFeed />
				<CreateMessageForm />
			</MainContentContainer>
		</main>
	);
}

export default App;
