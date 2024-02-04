import { httpClient } from '../http-client';
import { metersService } from './meters-service';

describe('Meters Service', () => {
	it('should get meters correctly', async () => {
		vi.spyOn(httpClient, 'get').mockResolvedValue({
			data: ['mocked-response'],
		});

		const meters = await metersService.getMeters();

		expect(meters).toEqual(['mocked-response']);
		expect(httpClient.get).toHaveBeenCalledWith('/meters');
	});
});
