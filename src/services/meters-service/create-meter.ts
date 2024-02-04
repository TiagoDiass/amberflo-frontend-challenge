import { Meter } from '@/types/meters';
import { HttpStatusCode, isAxiosError } from 'axios';
import { httpClient } from '../http-client';

export type CreateMeterParams = Pick<
	Meter,
	'api_name' | 'display_name' | 'active' | 'used_for_billing' | 'type'
>;

type CreateMeterResult = {
	successfullyCreated: boolean;
	errorMessage?: string;
};

export async function createMeter(
	params: CreateMeterParams,
): Promise<CreateMeterResult> {
	try {
		const response = await httpClient.post('/meters', {
			api_name: params.api_name,
			display_name: params.display_name,
			active: params.active,
			used_for_billing: params.used_for_billing,
			type: params.type,
		});

		return {
			successfullyCreated: response.status === HttpStatusCode.Created,
		};
	} catch (err: unknown) {
		console.error(err);

		return {
			successfullyCreated: false,
			errorMessage: isAxiosError(err)
				? err.response?.data.error
				: 'Unexpected error',
		};
	}
}
