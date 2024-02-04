import { httpClient } from '../http-client';
import { getMeters } from './get-meters';

describe('Service method: Get Meters', () => {
	it('should get meters correctly', async () => {
		vi.spyOn(httpClient, 'get').mockResolvedValue({
			data: ['mocked-response'],
		});

		const meters = await getMeters();

		expect(meters).toEqual(['mocked-response']);
		expect(httpClient.get).toHaveBeenCalledWith('/meters');
	});
});
