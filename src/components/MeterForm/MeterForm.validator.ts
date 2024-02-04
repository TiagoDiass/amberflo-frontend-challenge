export type MeterFormSchema = {
	displayName: string;
	apiName: string;
	type?: 'sum' | 'max' | 'unique_count';
	isActive: boolean;
	usedForBilling: boolean;
};

export function validateMeterForm(form: MeterFormSchema): boolean {
	if (!form.displayName || !form.apiName || !form.type) {
		return false;
	}

	return true;
}
