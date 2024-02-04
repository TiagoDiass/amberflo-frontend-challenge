import { Meter } from '@/types/meters';
import { sortMeters } from './sort-meters';

const meter1: Meter = {
	id: '0839b368-d3d1-41a3-9938-d4c6df8a3d64',
	api_name: 'STORAGE_USED',
	display_name: 'Storage Used',
	active: false,
	used_for_billing: false,
	updated_time: '2023-05-10T00:57:55.628Z',
	created_time: '2023-05-10T00:57:55.628Z',
	type: 'max',
};

const meter2: Meter = {
	id: '1634a14b-ecfa-405c-9113-5f71ae99b97a',
	api_name: 'API_CALLS',
	display_name: 'API Calls',
	active: true,
	used_for_billing: true,
	updated_time: '2022-10-01T00:57:55.628Z',
	created_time: '2022-10-01T00:57:55.628Z',
	type: 'sum',
};

const meter3: Meter = {
	id: '3a309982-720c-49b6-a28a-4f5d9d415509',
	api_name: 'LOGINS',
	display_name: 'Logins',
	active: false,
	used_for_billing: false,
	updated_time: '2025-04-20T04:36:30.882Z',
	created_time: '2025-04-20T04:36:30.882Z',
	type: 'unique_count',
};

describe('Util: sortMeter', () => {
	it('should not sort the meters if options are not specified', () => {
		const unsorted: Meter[] = [meter1, meter2, meter3];
		const result = sortMeters(unsorted, null);

		expect(result).toEqual(unsorted);
	});

	it('should sort meters correctly by a string field', () => {
		const unsorted: Meter[] = [meter1, meter2, meter3];

		const ascendingSorted = sortMeters(unsorted, {
			field: 'display_name',
			direction: 'ascending',
		});

		expect(ascendingSorted).toEqual([meter2, meter3, meter1]);

		const descendingSorted = sortMeters(unsorted, {
			field: 'display_name',
			direction: 'descending',
		});

		expect(descendingSorted).toEqual([meter1, meter3, meter2]);
	});

	it('should sort meters correctly by a date string field', () => {
		const unsorted: Meter[] = [meter1, meter2, meter3];

		const ascendingSorted = sortMeters(unsorted, {
			field: 'created_time',
			direction: 'ascending',
		});

		expect(ascendingSorted).toEqual([meter2, meter1, meter3]);

		const descendingSorted = sortMeters(unsorted, {
			field: 'created_time',
			direction: 'descending',
		});

		expect(descendingSorted).toEqual([meter3, meter1, meter2]);
	});

	it('should sort meters correctly by a boolean field', () => {
		const unsorted: Meter[] = [meter1, meter2, meter3];

		const ascendingSorted = sortMeters(unsorted, {
			field: 'active',
			direction: 'ascending',
		});

		expect(ascendingSorted).toEqual([meter1, meter3, meter2]);
	});
});
