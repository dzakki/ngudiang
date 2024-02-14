import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  appearance?: 'subtle' | 'primary';
  shouldFitContainer?: boolean;
  spacing?: 'compact' | 'default' | 'none';
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
}

export const baseButtonClassName =
  'w-auto duration-75 text-inherit leading-9 font-medium max-w-full text-center ps-3 pe-3 gap-x-1 align-middle justify-center bg-blue-700 text-white rounded-[4px] border-none hover:bg-blue-600 flex flex-row disabled:pointer-events-none';

const classNameByApearance = {
  subtle: 'bg-transparent text-blue-950 hover:bg-neutral-300',
  primary: 'bg-blue-700 text-white hover:bg-blue-600',
};

const classNameBySpacing = {
  default: 'leading-9',
  compact: 'leading-7',
  none: 'leading-5',
};

export function Button({
  children,
  className,
  shouldFitContainer,
  appearance = 'primary',
  spacing = 'default',
  iconAfter,
  iconBefore,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        clsx(
          baseButtonClassName,
          classNameByApearance[appearance],
          shouldFitContainer && 'w-full',
          classNameBySpacing[spacing],
          className,
          'items-center'
        )
      )}
      {...props}
    >
      {iconBefore} <span className='flex-1'>{children}</span> {iconAfter}
    </button>
  );
}

