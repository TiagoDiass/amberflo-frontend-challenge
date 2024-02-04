import { render } from '@testing-library/react';
import { Header } from './Header';

describe('Component: Header', () => {
	it('should render correctly', () => {
		const { container } = render(<Header />);

		expect(container.firstChild).toMatchInlineSnapshot(`
			<header
			  class="bg-amber-600 py-4 mb-8 px-6"
			>
			  <div
			    class="w-full max-w-screen-lg mx-auto"
			  >
			    <h2
			      class="text-2xl text-zinc-100"
			    >
			      <strong>
			        Easy
			      </strong>
			      <span
			        class="font-light"
			      >
			        Meters
			      </span>
			    </h2>
			  </div>
			</header>
		`);
	});
});
