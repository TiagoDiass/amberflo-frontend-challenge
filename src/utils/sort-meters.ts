import { Meter } from '@/types/meters';
import { sort } from 'fast-sort';

export type SortMetersOptions = {
	field: keyof Meter;
	direction: 'ascending' | 'descending';
};

export function sortMeters(
	meters: Meter[],
	options: SortMetersOptions | null,
): Meter[] {
	if (!options) return meters;

	const sortingFunction = options.direction === 'ascending' ? 'asc' : 'desc';
	const sortFunction = sort(meters)[sortingFunction];

	const sorted = sortFunction((m) => m[options.field]);

	return sorted;
}
