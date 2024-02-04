import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { metersService } from '@/services/meters-service/meters-service';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { FormEvent, MouseEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MeterFormSchema, validateMeterForm } from './CreateMeter.validator';

export function CreateMeter() {
	const navigate = useNavigate();
	const { toast } = useToast();
	const [form, setForm] = useState<MeterFormSchema>({
		apiName: '',
		displayName: '',
		type: undefined,
		isActive: false,
		usedForBilling: false,
	});
	const [isLoading, setIsLoading] = useState(false);

	function updateFieldValue(field: keyof typeof form, value: unknown) {
		setForm((previousForm) => ({
			...previousForm,
			[field]: value,
		}));
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement> | MouseEvent) {
		event.preventDefault();

		const isFormValid = validateMeterForm(form);

		if (!isFormValid) {
			toast({
				variant: 'destructive',
				title: 'Oops',
				description: 'Missing required fields for the form.',
			});
			return;
		}

		setIsLoading(true);

		const response = await metersService.createMeter({
			display_name: form.displayName,
			api_name: form.apiName,
			active: form.isActive,
			used_for_billing: form.usedForBilling,
			// biome-ignore lint/style/noNonNullAssertion: form validation makes sure the type field is filled in
			type: form.type!,
		});

		setIsLoading(false);

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

			<form
				className="mt-4 max-w-lg flex flex-col gap-5"
				onSubmit={handleSubmit}
			>
				<div className="flex flex-col gap-3">
					<Label htmlFor="displayName">Display name</Label>
					<Input
						type="text"
						autoComplete="off"
						id="displayName"
						placeholder="Display name for the meter"
						value={form.displayName}
						onChange={(event) =>
							updateFieldValue('displayName', event.target.value)
						}
					/>
				</div>

				<div className="flex flex-col gap-3">
					<Label htmlFor="apiName">API name</Label>
					<Input
						type="text"
						autoComplete="off"
						id="apiName"
						placeholder="API name for the meter"
						value={form.apiName}
						onChange={(event) =>
							updateFieldValue('apiName', event.target.value)
						}
					/>
				</div>

				<div className="flex flex-col gap-3">
					<Label htmlFor="type">Meter type</Label>
					<Select
						onValueChange={(value) => updateFieldValue('type', value)}
						defaultValue={form.type}
					>
						<SelectTrigger id="type">
							<SelectValue
								placeholder="Select a type"
								data-testid="meter-type-select-value"
							/>
						</SelectTrigger>

						<SelectContent>
							<SelectGroup>
								<SelectItem value="sum">Sum</SelectItem>
								<SelectItem value="max">Max</SelectItem>
								<SelectItem value="unique_count">Unique count</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className="flex items-center space-x-2">
					<Switch
						id="isActive"
						checked={form.isActive}
						onCheckedChange={(value) => updateFieldValue('isActive', value)}
					/>
					<Label htmlFor="isActive">Active</Label>
				</div>

				<div className="flex items-center space-x-2">
					<Switch
						id="usedForBilling"
						checked={form.usedForBilling}
						onCheckedChange={(value) =>
							updateFieldValue('usedForBilling', value)
						}
					/>
					<Label htmlFor="usedForBilling">Used for billing</Label>
				</div>

				<div className="flex gap-2">
					<Link to="/" className="flex-1">
						<Button type="button" variant="outline" className="w-full">
							<ArrowLeft className="size-4 mr-2" /> Back to home
						</Button>
					</Link>

					<Button
						className="flex-1"
						type="submit"
						disabled={isLoading}
						onClick={handleSubmit}
					>
						{isLoading ? (
							<Loader2
								aria-label="Loading icon"
								className="size-5 animate-spin"
							/>
						) : (
							'Create meter'
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}
