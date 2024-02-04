import { Badge } from '@/components/Badge/Badge';
import { Button } from '@/components/ui/button';
import { useMetersStore } from '@/store/use-meters-store';
import { formatters } from '@/utils/formatters';
import { ArrowLeft, SquarePen } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

export function MeterDetails() {
	const currentMeter = useMetersStore((store) => store.state.currentMeter);

	if (!currentMeter) {
		return <Navigate to="/" />;
	}

	return (
		<div className="max-w-screen-lg mx-auto px-6">
			<div className="flex justify-between items-center">
				<h1 className="font-semibold text-xl text-zinc-700">Meter details</h1>

				<Link to={`/meters/${currentMeter.id}/edit`}>
					<Button>
						Edit meter
						<SquarePen aria-label="Loading icon" className="size-5 ml-1" />
					</Button>
				</Link>
			</div>

			<div className="mt-4 flex flex-col gap-2">
				<div className="flex flex-col">
					<strong>Meter ID</strong>
					<span>{currentMeter.id}</span>
				</div>

				<div className="flex flex-col">
					<strong>Display Name</strong>
					<span>{currentMeter.display_name}</span>
				</div>

				<div className="flex flex-col">
					<strong>API Name</strong>
					<span className="italic">{currentMeter.api_name}</span>
				</div>

				<div className="flex flex-col">
					<strong>Meter Type</strong>
					<span className="italic">{currentMeter.type}</span>
				</div>

				<div className="flex flex-col">
					<strong>Meter status</strong>
					<div className="w-20">
						{currentMeter.active ? (
							<Badge color="green">Active</Badge>
						) : (
							<Badge color="red">Inactive</Badge>
						)}
					</div>
				</div>

				<div className="flex flex-col">
					<strong>Meter is used for billing?</strong>
					<span>{currentMeter.used_for_billing ? 'Yes' : 'No'}</span>
				</div>

				<div className="flex flex-col">
					<strong>Created at</strong>
					<span>{formatters.formatDate(currentMeter.created_time)}</span>
				</div>

				<div className="flex flex-col">
					<strong>Last updated at</strong>
					<span>{formatters.formatDate(currentMeter.updated_time)}</span>
				</div>

				<Link to="/">
					<Button className="mt-4 w-min" variant="outline">
						<ArrowLeft className="size-4 mr-2" /> Back to home
					</Button>
				</Link>
			</div>
		</div>
	);
}
