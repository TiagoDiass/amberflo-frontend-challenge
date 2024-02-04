import { Header } from '@/components/Header/Header';
import { Toaster } from '@/components/ui/toaster';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CreateMeter, EditMeter, MeterDetails, MetersList } from './pages';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MetersList />,
	},
	{
		path: '/meters/:meterId/details',
		element: <MeterDetails />,
	},
	{
		path: '/create-meter',
		element: <CreateMeter />,
	},
	{
		path: '/meters/:meterId/edit',
		element: <EditMeter />,
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
