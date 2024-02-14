import { useParams } from '@remix-run/react';
import Loading from '~/components/Loading';
import { Select } from '~/components/Select';
import { useGetTicketById, useUpdateStatus } from '~/hooks/useControllerTicket';

export default function Status() {
  const { fetchSync: getTicket } = useGetTicketById();
  const { mutate, isLoading } = useUpdateStatus();
  const params = useParams();
  const ticketId = params['ticketId'];
  const currentTicket = getTicket(Number(ticketId));

  const handleOnChange = async (value: string) => {
    if (currentTicket) {
      await mutate(currentTicket, value);
    }
  };
  return (
    <div className='flex flex-row items-center'>
      <Select
        disabled={((currentTicket?.status ?? '') === 'Completed') || isLoading}
        value={currentTicket?.status ?? ''}
        options={['Open', 'In Proggress', 'Completed']}
        onChange={handleOnChange}
        className='w-[220px]'
      />
      {isLoading && <Loading className='mt-0.5 h-4 text-black mr-1 ml-3' />}
    </div>
  );
}

