import { Header } from '@/components/Header/Header';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/about',
		element: <About />,
	},
]);

export function Routes() {
	return (
		<>
			<Header />
			<RouterProvider router={router} />
		</>
	);
}
