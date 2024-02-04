import { Meter } from '@/types/meters';
import { HttpStatusCode, isAxiosError } from 'axios';
import { httpClient } from '../http-client';

export type UpdateMeterParams = Pick<
	Meter,
	'api_name' | 'display_name' | 'active' | 'used_for_billing' | 'type'
>;

type UpdateMeterResult = {
	successfullyUpdated: boolean;
	errorMessage?: string;
};

export async function updateMeter(
	meterId: string,
	params: UpdateMeterParams,
): Promise<UpdateMeterResult> {
	try {
		const response = await httpClient.put(`/meters/${meterId}`, {
			api_name: params.api_name,
			display_name: params.display_name,
			active: params.active,
			used_for_billing: params.used_for_billing,
			type: params.type,
		});

		return {
			successfullyUpdated: response.status === HttpStatusCode.Created,
		};
	} catch (err: unknown) {
		console.error(err);

		return {
			successfullyUpdated: false,
			errorMessage: isAxiosError(err)
				? err.response?.data.error
				: 'Unexpected error',
		};
	}
}
