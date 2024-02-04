import { MeterForm, MeterFormSchema } from '@/components/MeterForm/MeterForm';
import { useToast } from '@/components/ui/use-toast';
import { metersService } from '@/services/meters-service/meters-service';
import { useNavigate } from 'react-router-dom';

export function CreateMeter() {
	const navigate = useNavigate();
	const { toast } = useToast();

	async function handleSubmit(form: MeterFormSchema) {
		const response = await metersService.createMeter({
			display_name: form.displayName,
			api_name: form.apiName,
			active: form.isActive,
			used_for_billing: form.usedForBilling,
			// biome-ignore lint/style/noNonNullAssertion: form validation makes sure the type field is filled in
			type: form.type!,
		});

		if (response.successfullyCreated) {
			navigate('/');
			toast({
				title: 'Good job!',
				description: 'Meter created successfully.',
			});
		}
	}

	return (
		<div className="max-w-screen-lg mx-auto px-6">
			<h1 className="font-semibold text-xl text-zinc-700">
				Create a new meter
			</h1>

			<MeterForm onSubmit={handleSubmit} submitButtonText="Create meter" />
		</div>
	);
}
