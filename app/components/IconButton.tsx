import clsx from 'clsx';
import { Button, ButtonProps } from './Button';
import { twMerge } from 'tailwind-merge';

type IconButtonProps = Omit<ButtonProps, 'iconBefore | iconAfter'>;

export function IconButton({ className, children, ...props }: IconButtonProps) {
  return (
    <Button
      className={twMerge(clsx('ps-1.5 pe-1.5 items-center', className))}
      {...props}
    >
     {children}
    </Button>
  );
}

