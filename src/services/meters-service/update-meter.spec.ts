import { httpClient } from '../http-client';
import { UpdateMeterParams, updateMeter } from './update-meter';

describe('Service method: Update Meter', () => {
	it('should update a meter correctly', async () => {
		vi.spyOn(httpClient, 'put').mockResolvedValue({
			status: 201,
		});

		const params: UpdateMeterParams = {
			api_name: 'FAKE_API_NAME',
			display_name: 'fake-display-name',
			active: true,
			used_for_billing: true,
			type: 'sum',
		};

		const result = await updateMeter('fake-meter-id', params);

		expect(result.successfullyUpdated).toBe(true);
		expect(httpClient.put).toHaveBeenCalledWith('/meters/fake-meter-id', {
			api_name: 'FAKE_API_NAME',
			display_name: 'fake-display-name',
			active: true,
			used_for_billing: true,
			type: 'sum',
		});
	});

	it('should return an error in case a meter update fails', async () => {
		vi.spyOn(httpClient, 'put').mockRejectedValue({
			status: 400,
		});

		const params: UpdateMeterParams = {
			api_name: 'FAKE_API_NAME',
			display_name: 'fake-display-name',
			active: true,
			used_for_billing: true,
			type: 'sum',
		};

		const result = await updateMeter('fake-meter-id', params);

		expect(result.successfullyUpdated).toBe(false);
	});
});
