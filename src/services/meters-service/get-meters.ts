import { Meter } from '@/types/meters';
import { httpClient } from '../http-client';

export async function getMeters(): Promise<Meter[]> {
	const response = await httpClient.get('/meters');
	const meters = response.data;

	return meters;
}
