import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';

export default function Route() {
	const route = createBrowserRouter([
		{
			path: '/',
			element: <App />,
		},
		{
			path: '/login',
			element: <LoginForm />,
		},
		{
			path: '/signup',
			element: <SignupForm />,
		},
	]);

	return <RouterProvider router={route} />;
}
