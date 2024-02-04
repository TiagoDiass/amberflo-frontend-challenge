import { MeterForm, MeterFormSchema } from '@/components/MeterForm/MeterForm';
import { useToast } from '@/components/ui/use-toast';
import { metersService } from '@/services/meters-service/meters-service';
import { useMetersStore } from '@/store/use-meters-store';
import { Navigate, useNavigate } from 'react-router-dom';

export function EditMeter() {
	const navigate = useNavigate();
	const { toast } = useToast();
	const currentMeter = useMetersStore((store) => store.state.currentMeter);

	if (!currentMeter) {
		return <Navigate to="/" />;
	}

	async function handleSubmit(form: MeterFormSchema) {
		// biome-ignore lint/style/noNonNullAssertion: this function will only be called when there is a current meter
		const response = await metersService.updateMeter(currentMeter!.id, {
			display_name: form.displayName,
			api_name: form.apiName,
			active: form.isActive,
			used_for_billing: form.usedForBilling,
			// biome-ignore lint/style/noNonNullAssertion: form validation makes sure the type field is filled in
			type: form.type!,
		});

		if (response.successfullyUpdated) {
			navigate('/');
			toast({
				title: 'Good job!',
				description: 'Meter updated successfully.',
			});
		}
	}

	return (
		<div className="max-w-screen-lg mx-auto px-6">
			<h1 className="font-semibold text-xl text-zinc-700">Update meter</h1>

			<MeterForm
				onSubmit={handleSubmit}
				submitButtonText="Update meter"
				initialValues={{
					apiName: currentMeter.api_name,
					displayName: currentMeter.display_name,
					type: currentMeter.type,
					isActive: currentMeter.active,
					usedForBilling: currentMeter.used_for_billing,
				}}
			/>
		</div>
	);
}
