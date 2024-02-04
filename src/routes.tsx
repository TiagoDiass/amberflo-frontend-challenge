import { Header } from '@/components/Header/Header';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MeterDetails } from './pages/MeterDetails/MeterDetails';
import { MetersList } from './pages/MetersList/MetersList';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MetersList />,
	},
	{
		path: '/meters/:meterId/details',
		element: <MeterDetails />,
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
