import { metersService } from '@/services/meters-service/meters-service';
import { Meter } from '@/types/meters';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { MetersList } from './MetersList';

function renderComponent() {
	const renderResult = render(
		<BrowserRouter>
			<MetersList />
		</BrowserRouter>,
	);

	return renderResult;
}

const metersMock: Meter[] = [
	{
		id: '3a309982-720c-49b6-a28a-4f5d9d415509',
		api_name: 'LOGINS',
		display_name: 'Logins',
		active: false,
		used_for_billing: false,
		updated_time: '2023-04-19T04:36:30.882Z',
		created_time: '2023-04-19T04:36:30.882Z',
		type: 'unique_count',
	},
	{
		id: '1634a14b-ecfa-405c-9113-5f71ae99b97a',
		api_name: 'API_CALLS',
		display_name: 'API Calls',
		active: true,
		used_for_billing: true,
		updated_time: '2023-06-07T20:09:22.933Z',
		created_time: '2023-04-19T00:57:55.628Z',
		type: 'sum',
	},
];

describe('Page: MetersList', () => {
	it('should render a list of meters correctly', async () => {
		vi.spyOn(metersService, 'getMeters').mockResolvedValue(metersMock);

		const { container } = renderComponent();

		await waitFor(() => {
			expect(screen.getAllByRole('row')).toHaveLength(3); // 3 rows -> 1 is the table header, 2 are from the table body
		});

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should sort the meters list correctly', async () => {
		vi.spyOn(metersService, 'getMeters').mockResolvedValue(metersMock);

		renderComponent();

		await waitFor(() => {
			expect(screen.getAllByRole('row')).toHaveLength(3);
		});

		const sortByDisplayNameButton = screen.getByRole('button', {
			name: 'Sort table by Display Name field',
		});
		await userEvent.click(sortByDisplayNameButton);

		const sortedCells = screen.getAllByTestId('meter-display-name');

		expect(sortedCells[0]).toHaveTextContent(metersMock[1].display_name);
		expect(sortedCells[1]).toHaveTextContent(metersMock[0].display_name);

		await userEvent.click(sortByDisplayNameButton);
		const reversedSorted = screen.getAllByTestId('meter-display-name');

		expect(reversedSorted[0]).toHaveTextContent(metersMock[0].display_name);
		expect(reversedSorted[1]).toHaveTextContent(metersMock[1].display_name);
	});
});
