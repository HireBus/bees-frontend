import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border',
        ghost: 'hover:bg-opacity-10',
      },
      color: {
        primary: 'text-primary focus-visible:ring-primary',
        secondary: 'text-secondary focus-visible:ring-secondary/20',
        destructive: 'text-destructive focus-visible:ring-destructive/20',
      },
      size: {
        sm: 'h-8 gap-2 px-3 text-xs rounded-xl [&_svg]:size-3.5',
        md: 'h-11 gap-2 px-4 rounded-2xl [&_svg]:size-4',
        lg: 'h-[44px] gap-2 px-4 rounded-2xl [&_svg]:size-4',
        xl: 'h-14 gap-2 px-8 text-lg rounded-2xl [&_svg]:size-6',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        color: 'primary',
        className: 'bg-primary text-white hover:bg-primary/90',
      },
      {
        variant: 'solid',
        color: 'secondary',
        className: 'bg-secondary text-white hover:bg-secondary/90',
      },
      {
        variant: 'solid',
        color: 'destructive',
        className: 'bg-destructive text-white hover:bg-destructive/90',
      },
      // Outline variants
      {
        variant: 'outline',
        color: 'primary',
        className: 'border-primary hover:bg-primary/5',
      },
      {
        variant: 'outline',
        color: 'secondary',
        className: 'border-secondary hover:bg-secondary/5',
      },
      {
        variant: 'outline',
        color: 'destructive',
        className: 'border-destructive hover:bg-destructive/5',
      },
      // Ghost variants
      {
        variant: 'ghost',
        color: 'primary',
        className: 'hover:bg-primary/5',
      },
      {
        variant: 'ghost',
        color: 'secondary',
        className: 'hover:bg-secondary/5',
      },
      {
        variant: 'ghost',
        color: 'destructive',
        className: 'hover:bg-destructive/5',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'primary',
      size: 'md',
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    Pick<ButtonVariantProps, 'color'>,
    Omit<ButtonVariantProps, 'color'> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'solid', color = 'primary', size = 'md', asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, color, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
