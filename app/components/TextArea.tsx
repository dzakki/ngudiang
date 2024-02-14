import clsx from 'clsx';
import { useCallback, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextAreaProps
  extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  containerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  resizeInFirstRender?: boolean;
}

const baseInputClassName =
  'w-full m-h-full border-none bg-transparent box-border text-inherit outline-none leading-5 py-2 px-[6px]';
export function TextArea({ resizeInFirstRender, className, rows, onChange, containerProps = {}, ...props }: TextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { className: containerClassName } = containerProps;

  /**
   * Auto resizes the text area based on its content.
   */
  const autoResize = useCallback(() => {
    const scrollHeight = textAreaRef?.current?.scrollHeight;
    textAreaRef!.current!.style!.height = scrollHeight + 'px';
  }, []);


  useEffect(() => {
    if (resizeInFirstRender) {
      autoResize();
    }
  }, [autoResize, resizeInFirstRender])

  return (
    <div
      className={twMerge(
        clsx(
          'border-2 items-center box-border flex bg-white border-zinc-200 text-sky-950 cursor-text rounded-[4px] overflow-hidden transition focus-within:border-blue-500 focus-within:bg-white',
          containerClassName
        )
      )}
    >
      <textarea
        ref={textAreaRef}
        className={clsx(baseInputClassName, className)}
        rows={rows || 2}
        onChange={(e) => {
          autoResize();
          onChange?.(e);
        }}
        {...props}
      />
    </div>
  );
}

