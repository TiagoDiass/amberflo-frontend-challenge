import { render } from '@testing-library/react';
import { Badge } from './Badge';

describe('Component: Badge', () => {
	it('should render badge correctly', () => {
		const { container } = render(<Badge color="green">Active</Badge>);

		expect(container.firstChild).toMatchInlineSnapshot(`
			<div
			  class="p-1 text-xs font-semibold text-zinc-50 text-center rounded-full opacity-95 bg-green-600"
			>
			  Active
			</div>
		`);
	});
});
