import { metersService } from '@/services/meters-service/meters-service';
import { useMetersStore } from '@/store/use-meters-store';
import { Meter } from '@/types/meters';
import {
	getMeterFormFields,
	mockPointerEventAndResizeObserver,
} from '@/utils/test-utils';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { EditMeter } from './EditMeter';

function renderComponent() {
	vi.spyOn(metersService, 'updateMeter').mockResolvedValue({
		successfullyUpdated: true,
	});

	render(
		<BrowserRouter>
			<EditMeter />
		</BrowserRouter>,
	);
}

const user = userEvent.setup();

mockPointerEventAndResizeObserver();

describe('Page: EditMeter', () => {
	it('should edit a meter correctly', async () => {
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

		const { displayNameInput, apiNameInput } = getMeterFormFields();
		const submitButton = screen.getByRole('button', { name: /Update meter/ });

		await user.clear(displayNameInput);
		await user.type(displayNameInput, 'updated display name');

		await user.clear(apiNameInput);
		await user.type(apiNameInput, 'NEW_API_NAME');

		await user.click(submitButton);

		expect(metersService.updateMeter).toHaveBeenCalledTimes(1);
		expect(metersService.updateMeter).toHaveBeenCalledWith(meterMock.id, {
			display_name: 'updated display name',
			api_name: 'NEW_API_NAME',
			type: 'max',
			active: true,
			used_for_billing: false,
		});
	});
});
