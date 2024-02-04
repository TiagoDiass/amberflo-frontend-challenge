import { metersService } from '@/services/meters-service/meters-service';
import { useMetersStore } from '@/store/use-meters-store';
import { Meter } from '@/types/meters';
import { SortMetersOptions, sortMeters } from '@/utils/sort-meters';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useMetersList() {
	const setCurrentMeter = useMetersStore(
		(store) => store.actions.setCurrentMeter,
	);
	const [meters, setMeters] = useState<Meter[]>([]);
	const [sortOptions, setSortOptions] = useState<SortMetersOptions | null>(
		null,
	);

	const sortedMeters = sortMeters(meters, sortOptions);
	const navigate = useNavigate();

	function navigateToMeterDetails(meter: Meter) {
		setCurrentMeter(meter);
		navigate(`/meters/${meter.id}/details`);
	}

	function handleSortMeters(field: keyof Meter) {
		if (sortOptions?.field === field) {
			const currentDirection = sortOptions.direction;
			const newDirection =
				currentDirection === 'ascending' ? 'descending' : 'ascending';

			setSortOptions({ field, direction: newDirection });
			return;
		}

		setSortOptions({
			field,
			direction: 'ascending',
		});
	}

	useEffect(() => {
		async function fetchMeters() {
			const metersResponse = await metersService.getMeters();

			setMeters(metersResponse);
		}

		fetchMeters();
	}, []);

	return {
		sortedMeters,
		sortOptions,
		handleSortMeters,
		navigateToMeterDetails,
	};
}
