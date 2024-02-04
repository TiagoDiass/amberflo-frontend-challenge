import { ReactNode } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const badgeStyles = tv({
	base: 'p-1 text-xs font-semibold text-zinc-50 text-center rounded-full opacity-95',
	variants: {
		color: {
			default: 'bg-zinc-600',
			green: 'bg-green-600',
			red: 'bg-red-600',
		},
	},
	defaultVariants: {
		color: 'default',
	},
});

export type BadgeProps = VariantProps<typeof badgeStyles> & {
	children: ReactNode;
};

export function Badge({ children, color }: BadgeProps) {
	return <div className={badgeStyles({ color })}>{children}</div>;
}
