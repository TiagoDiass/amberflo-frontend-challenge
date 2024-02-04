import {
	getMeterFormFields,
	mockPointerEventAndResizeObserver,
} from '@/utils/test-utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { MeterForm, MeterFormSchema } from './MeterForm';

function renderComponent(initialValues?: MeterFormSchema) {
	const onSubmitMock = vi.fn();

	render(
		<BrowserRouter>
			<MeterForm
				onSubmit={onSubmitMock}
				submitButtonText="Create meter"
				initialValues={initialValues}
			/>
		</BrowserRouter>,
	);

	return { onSubmitMock };
}

const user = userEvent.setup();

mockPointerEventAndResizeObserver();

describe('Components: MeterForm', () => {
	it('should call props.onSubmit when user submits form correctly', async () => {
		const { onSubmitMock } = renderComponent();

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

		expect(onSubmitMock).toHaveBeenCalledTimes(1);
		expect(onSubmitMock).toHaveBeenCalledWith({
			displayName: 'Fake display name',
			apiName: 'FAKE_API_NAME',
			type: 'unique_count',
			isActive: true,
			usedForBilling: true,
		});
	});

	it('should load with initialValues when they are specified', async () => {
		const initialValues: MeterFormSchema = {
			displayName: 'Initial display name',
			apiName: 'INITIAL_API_NAME',
			type: 'unique_count',
			isActive: true,
			usedForBilling: true,
		};

		renderComponent(initialValues);

		const {
			displayNameInput,
			apiNameInput,
			meterActiveSwitch,
			meterUsedForBillingSwitch,
		} = getMeterFormFields();

		expect(displayNameInput).toHaveValue('Initial display name');
		expect(apiNameInput).toHaveValue('INITIAL_API_NAME');
		expect(screen.getByTestId('meter-type-select-value')).toHaveTextContent(
			'Unique count',
		);
		expect(meterActiveSwitch).toBeChecked();
		expect(meterUsedForBillingSwitch).toBeChecked();
	});
});
