import { useMetersStore } from '@/store/use-meters-store';
import { Meter } from '@/types/meters';
import { formatters } from '@/utils/formatters';
import { render, renderHook, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MeterDetails } from './MeterDetails';

// Mocking react-router-dom <Navigate /> component to cover the redirection test case
vi.mock('react-router-dom', async (importOriginal) => {
	// biome-ignore lint/suspicious/noExplicitAny: vitest importOriginal cannot type the library I am mocking here
	const actual = (await importOriginal()) as any;

	return {
		...actual,
		Navigate: () => <div data-testid="navigate-mock" />,
	};
});

function renderComponent() {
	render(
		<BrowserRouter>
			<MeterDetails />
		</BrowserRouter>,
	);
}

describe('Page: MeterDetails', () => {
	it('should render meter details correctly', () => {
		const result = renderHook(() => useMetersStore()).result;
		const meterMock: Meter = {
			id: '0839b368-d3d1-41a3-9938-d4c6df8a3d64',
			api_name: 'STORAGE_USED',
			display_name: 'Storage Used',
			active: true,
			used_for_billing: false,
			updated_time: '2023-06-07T20:09:22.933Z',
			created_time: '2023-04-19T00:57:55.628Z',
			type: 'max',
		};

		result.current.state.currentMeter = meterMock;

		renderComponent();

		expect(screen.getByText(meterMock.id)).toBeInTheDocument();
		expect(screen.getByText('Storage Used')).toBeInTheDocument();
		expect(screen.getByText('STORAGE_USED')).toBeInTheDocument();
		expect(screen.getByText('max')).toBeInTheDocument(); // meter type
		expect(screen.getByText('Active')).toBeInTheDocument(); // meter status (is active or not)
		expect(screen.getByText('No')).toBeInTheDocument(); // meter is not used for billing
		expect(
			screen.getByText(formatters.formatDate(meterMock.created_time)),
		).toBeInTheDocument();
		expect(
			screen.getByText(formatters.formatDate(meterMock.updated_time)),
		).toBeInTheDocument();

		expect(
			screen.getByRole('link', { name: /Edit meter/ }),
		).toBeInTheDocument();
	});

	it('should navigate to meter list if there are no currentMeter', () => {
		const result = renderHook(() => useMetersStore()).result;
		result.current.state.currentMeter = null;

		renderComponent();

		// Just checking if Navigate was rendered. The behavior of <Navigate /> does not need to be tested
		expect(screen.getByTestId('navigate-mock')).toBeInTheDocument();
	});
});
