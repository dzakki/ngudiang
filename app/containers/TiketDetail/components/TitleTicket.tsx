import { useNavigate, useParams } from '@remix-run/react';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TextArea } from '~/components/TextArea';
import { useUpdateTitleTicket } from '~/hooks/useControllerTicket';
import { useDebouncedCallback } from '~/hooks/useDebouncedCallback';

interface TitleTicketProps {
  defaultTitle?: string;
}

export default function TitleTicket({ defaultTitle }: TitleTicketProps) {
  const [isActive, setIsActive] = useState(false);
  const isInitializeTitle = useRef(false);
  const [title, setTitle] = useState(``);
  const titleInputRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const params = useParams();
  const ticketId = params['ticketId'];

  const { mutate: updateTitleTicket } = useUpdateTitleTicket();

  const setTitleTicketStore = useDebouncedCallback(
    useCallback(
      (title: string) => {
        updateTitleTicket(title, Number(ticketId));
      },
      [ticketId, updateTitleTicket]
    ),
    500
  );

  useEffect(() => {
    if (!isInitializeTitle.current && defaultTitle) {
      setTitle(defaultTitle);

      isInitializeTitle.current = true;
    }
  }, [defaultTitle]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (isActive && !titleInputRef.current?.contains?.(e.target as Node)) {
        setIsActive(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [isActive, navigate]);

  useEffect(() => {
    if (isInitializeTitle.current && title && title !== defaultTitle) {
      setTitleTicketStore(title);
    }
  }, [title, defaultTitle, setTitleTicketStore]);

  return (
    <div className='mr-8'>
      <h2
        className={clsx('font-semibold text-xl text-blue-950 cursor-pointer', isActive && 'hidden')}
        onClick={() => setIsActive(true)}
        aria-hidden
      >
        {title}
      </h2>
      <div
        className={clsx(!isActive && 'hidden')}
        ref={titleInputRef}
      >
        <TextArea
          resizeInFirstRender={isActive}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={1}
          className='w-full'
        />
      </div>
    </div>
  );
}

