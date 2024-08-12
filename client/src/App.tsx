import ChatFeed from './components/ChatFeed';
import CreateMessageForm from './components/CreateMessageForm';
import Header from './components/Header';
import MainContentContainer from './components/MainContentContainer';

function App() {
	return (
		<main className='flex flex-col h-dvh'>
			<Header />
			<MainContentContainer>
				<ChatFeed />
				<CreateMessageForm />
			</MainContentContainer>
		</main>
	);
}

export default App;
