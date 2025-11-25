import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const buttonStyles = cva(
  'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-blue text-white shadow-card hover:bg-brand-blue/90 focus-visible:outline-brand-blue',
        ghost:
          'text-brand-blue bg-white border border-slate-200 hover:bg-slate-50 focus-visible:outline-brand-blue',
        subtle:
          'bg-brand-teal/10 text-brand-blue hover:bg-brand-teal/20 focus-visible:outline-brand-teal',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

export function Button({ variant, className, ...props }) {
  return (
    <button className={twMerge(buttonStyles({ variant }), className)} {...props} />
  )
}

