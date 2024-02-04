import { Badge } from '@/components/Badge/Badge';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Meter } from '@/types/meters';
import { formatters } from '@/utils/formatters';
import { Link } from 'react-router-dom';
import { SortingIcon } from './SortingIcon';
import { useMetersList } from './useMetersList';

type TableColumns = Array<{
	title: string;
	field: keyof Meter;
}>;

const tableColumns: TableColumns = [
	{ title: 'Display Name', field: 'display_name' },
	{ title: 'API Name', field: 'api_name' },
	{ title: 'Meter Type', field: 'type' },
	{ title: 'Status', field: 'active' },
	{ title: 'Used for billing', field: 'used_for_billing' },
	{ title: 'Modified', field: 'updated_time' },
];

export function MetersList() {
	const {
		sortedMeters,
		sortOptions,
		handleSortMeters,
		navigateToMeterDetails,
	} = useMetersList();

	return (
		<div className="max-w-screen-lg mx-auto px-6">
			<div className="flex justify-between items-center">
				<h1 className="font-semibold text-xl text-zinc-700">Your meters</h1>

				<Link to="/create-meter">
					<Button>Add new meter</Button>
				</Link>
			</div>

			<Table className="border border-zinc-200 mt-4">
				<TableHeader>
					<TableRow>
						{tableColumns.map((column) => (
							<TableHead key={column.field}>
								<div className="flex items-center gap-2">
									{column.title}

									<Button
										variant="ghost"
										size="sm"
										onClick={() => handleSortMeters(column.field)}
										title={`Sort table by ${column.title} field`}
									>
										<SortingIcon field={column.field} options={sortOptions} />
									</Button>
								</div>
							</TableHead>
						))}
					</TableRow>
				</TableHeader>

				<TableBody>
					{sortedMeters.map((meter) => (
						<TableRow
							key={meter.id}
							onClick={() => navigateToMeterDetails(meter)}
							className="cursor-pointer"
						>
							<TableCell data-testid="meter-display-name">
								{meter.display_name}
							</TableCell>

							<TableCell className="italic">{meter.api_name}</TableCell>

							<TableCell className="italic">{meter.type}</TableCell>

							<TableCell>
								{meter.active ? (
									<Badge color="green">Active</Badge>
								) : (
									<Badge color="red">Inactive</Badge>
								)}
							</TableCell>

							<TableCell>{meter.used_for_billing ? 'Yes' : 'No'}</TableCell>

							<TableCell>{formatters.formatDate(meter.updated_time)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
