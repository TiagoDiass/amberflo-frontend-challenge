import { Meter } from '@/types/meters';
import { SortMetersOptions } from '@/utils/sort-meters';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

type SortingIconProps = {
	field: keyof Meter;
	options: SortMetersOptions | null;
};

export function SortingIcon({ field, options }: SortingIconProps) {
	const classNames = 'size-4 text-zinc-800';

	if (!options || options.field !== field) {
		return <ArrowUpDown className={classNames} />;
	}

	return options.direction === 'ascending' ? (
		<ArrowDown className={classNames} />
	) : (
		<ArrowUp className={classNames} />
	);
}
