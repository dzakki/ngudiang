import clsx from 'clsx';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const baseInputClassName =
  'w-full border-none bg-transparent box-border text-inherit outline-none leading-5 py-2 px-[6px]';
export function Input({ className, ...props }: InputProps) {
  return (
    <div className='border-2 items-center box-border flex bg-white border-zinc-200 text-sky-950 cursor-text rounded-[4px] overflow-hidden transition focus-within:border-blue-500 focus-within:bg-white'>
      <input
        className={clsx(baseInputClassName, className)}
        {...props}
      />
    </div>
  );
}

