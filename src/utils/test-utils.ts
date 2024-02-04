import { screen } from '@testing-library/react';

// Helper to use in tests, this will help getting the meter form fields
export function getMeterFormFields() {
	return {
		displayNameInput: screen.getByRole('textbox', {
			name: /display name/i,
		}),
		apiNameInput: screen.getByRole('textbox', {
			name: /api name/i,
		}),
		meterTypeSelect: screen.getByRole('combobox', {
			name: /meter type/i,
		}),
		meterActiveSwitch: screen.getByRole('switch', {
			name: /active/i,
		}),
		meterUsedForBillingSwitch: screen.getByRole('switch', {
			name: /used for billing/i,
		}),
	};
}

export function mockPointerEventAndResizeObserver() {
	// biome-ignore lint/suspicious/noExplicitAny: mocking a window global API
	window.PointerEvent = class PointerEvent extends Event {} as any;
	window.HTMLElement.prototype.scrollIntoView = vi.fn();
	window.HTMLElement.prototype.hasPointerCapture = vi.fn();
	window.HTMLElement.prototype.releasePointerCapture = vi.fn();

	// Mock the ResizeObserver, an internal package of Radix uses it and without this mock the test breaks
	const ResizeObserverMock = vi.fn(() => ({
		observe: vi.fn(),
		unobserve: vi.fn(),
		disconnect: vi.fn(),
	}));

	// Stub the global ResizeObserver
	vi.stubGlobal('ResizeObserver', ResizeObserverMock);
}
