import { metersService } from '@/services/meters-service/meters-service';
import {
	getMeterFormFields,
	mockPointerEventAndResizeObserver,
} from '@/utils/test-utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { CreateMeter } from './CreateMeter';

function renderComponent() {
	vi.spyOn(metersService, 'createMeter').mockResolvedValue({
		successfullyCreated: true,
	});

	render(
		<BrowserRouter>
			<CreateMeter />
		</BrowserRouter>,
	);
}

const user = userEvent.setup();

mockPointerEventAndResizeObserver();

describe('Page: CreateMeter', () => {
	it('should create a meter correctly', async () => {
		renderComponent();

		const {
			displayNameInput,
			apiNameInput,
			meterTypeSelect,
			meterActiveSwitch,
			meterUsedForBillingSwitch,
		} = getMeterFormFields();
		const submitButton = screen.getByRole('button', { name: 'Create meter' });

		await user.type(displayNameInput, 'Fake display name');
		await user.type(apiNameInput, 'FAKE_API_NAME');

		await user.click(meterTypeSelect); // click to focus on select
		await user.keyboard('{Space}{ArrowDown}{ArrowDown}{Enter}'); // and then space for open it, arrow down two times to focus the third option, then enter to select it

		await user.click(meterActiveSwitch);
		await user.click(meterUsedForBillingSwitch);

		await user.click(submitButton);

		expect(metersService.createMeter).toHaveBeenCalledTimes(1);
		expect(metersService.createMeter).toHaveBeenCalledWith({
			display_name: 'Fake display name',
			api_name: 'FAKE_API_NAME',
			type: 'unique_count',
			active: true,
			used_for_billing: true,
		});
	});
});
