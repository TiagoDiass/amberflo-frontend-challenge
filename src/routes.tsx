import { Header } from '@/components/Header/Header';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MetersList } from './pages/MetersList/MetersList';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MetersList />,
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
