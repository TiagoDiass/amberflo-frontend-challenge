import { httpClient } from '../http-client';
import { CreateMeterParams, createMeter } from './create-meter';

describe('Service method: Create Meter', () => {
	it('should create a meter correctly', async () => {
		vi.spyOn(httpClient, 'post').mockResolvedValue({
			status: 201,
		});

		const params: CreateMeterParams = {
			api_name: 'FAKE_API_NAME',
			display_name: 'fake-display-name',
			active: true,
			used_for_billing: true,
			type: 'sum',
		};

		const result = await createMeter(params);

		expect(result.successfullyCreated).toBe(true);
		expect(httpClient.post).toHaveBeenCalledWith('/meters', {
			api_name: 'FAKE_API_NAME',
			display_name: 'fake-display-name',
			active: true,
			used_for_billing: true,
			type: 'sum',
		});
	});

	it('should return an error in case a meter creation fails', async () => {
		vi.spyOn(httpClient, 'post').mockRejectedValue({
			status: 400,
		});

		const params: CreateMeterParams = {
			api_name: 'FAKE_API_NAME',
			display_name: 'fake-display-name',
			active: true,
			used_for_billing: true,
			type: 'sum',
		};

		const result = await createMeter(params);

		expect(result.successfullyCreated).toBe(false);
	});
});
