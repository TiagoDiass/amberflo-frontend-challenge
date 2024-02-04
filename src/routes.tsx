import { Header } from '@/components/Header/Header';
import { Toaster } from '@/components/ui/toaster';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CreateMeter, MeterDetails, MetersList } from './pages';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MetersList />,
	},
	{
		path: '/create-meter',
		element: <CreateMeter />,
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
			<Toaster />
		</>
	);
}
