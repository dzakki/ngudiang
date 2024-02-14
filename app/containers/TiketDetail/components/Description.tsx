import { useParams } from '@remix-run/react';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Button } from '~/components/Button';
import Loading from '~/components/Loading';
import { TextArea } from '~/components/TextArea';
import { useUdateContentTicket } from '~/hooks/useControllerTicket';

interface DescriptionProps {
  defaultDescription: string;
}

export default function Description({ defaultDescription }: DescriptionProps) {
  const [isActive, setIsActive] = useState(false);
  const isInitializeTitle = useRef(false);
  const [description, setDescription] = useState(``);
  const { mutate, isLoading } = useUdateContentTicket();
  const params = useParams();
  const ticketId = params['ticketId'];

  useEffect(() => {
    if (!isInitializeTitle.current) {
      setDescription(defaultDescription ?? '');

      isInitializeTitle.current = true;
    }
  }, [defaultDescription]);

  const handleOnSave = async () => {
    try {
      await mutate(description, Number(ticketId));
      setIsActive(false);
    } catch (error) {
      console.error(error);
    }
  };

  const isDescriptionEmptyNotActive = !defaultDescription && !description && !isActive;

  return (
    <>
      <div
        className={clsx(
          'cursor-pointer',
          isDescriptionEmptyNotActive && 'h-14 w-full bg-gray-200 rounded py-2 px-[6px]',
          isActive && 'hidden'
        )}
        onClick={() => setIsActive(true)}
        aria-hidden='true'
      >
        <p>{description || 'Add a more detailed description'}</p>
      </div>
      <div className={clsx(!isActive && 'hidden')}>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Write a more detailed description, here.'
          resizeInFirstRender={isActive}
        />
        <div className='mt-2 flex flex-row gap-x-1'>
          <Button
            onClick={handleOnSave}
            iconBefore={isLoading && <Loading />}
            disabled={isLoading}
          >
            Save
          </Button>
          <Button
            disabled={isLoading}
            appearance='subtle'
            onClick={(e) => {
              setIsActive(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}

