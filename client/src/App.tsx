import ChatFeed from './components/ChatFeed';
import Header from './components/Header';
import MainContentContainer from './components/MainContentContainer';

function App() {
	return (
		<main className='flex flex-col h-dvh'>
			<Header />
			<MainContentContainer>
				<ChatFeed />
				{/* <CreateMessageForm/> */}
			</MainContentContainer>
		</main>
	);
}

export default App;
