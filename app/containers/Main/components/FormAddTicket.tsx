import { useState } from 'react';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/IconButton';
import Loading from '~/components/Loading';
import { TextArea } from '~/components/TextArea';
import { useAddData } from '~/hooks/useControllerTicket';

interface FormAddTicketProps {
  status: string;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export default function FormAddTicket({ status, isVisible, setIsVisible }: FormAddTicketProps) {
  const [title, setTitle] = useState('');
  const { mutate, isLoading } = useAddData();

  const close = () => {
    setTitle('')
    setIsVisible(false)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) {
      return;
    }
    try {
      await mutate({
        id: new Date().getUTCMilliseconds(),
        content: '',
        title,
        created_at: new Date().toString(),
        status,
      });
      close()
    } catch (error) {
      console.error(error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        value={status}
        name='status'
        className='hidden'
      />
      <TextArea
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={true}
        containerProps={{
          className: 'bg-white rounded-lg shadow-sm w-full border-0',
        }}
        aria-multiline
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div className='mt-2 flex flex-row gap-x-1'>
        <Button
          disabled={isLoading}
          type='submit'
          iconBefore={isLoading && <Loading />}
        >
          Add card
        </Button>
        <IconButton
          appearance='subtle'
          className='text-sm'
          type='button'
          onClick={close}
        >
          <svg
            width='24'
            height='24'
            role='presentation'
            focusable='false'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z'
              fill='currentColor'
            ></path>
          </svg>
        </IconButton>
      </div>
    </form>
  );
}

