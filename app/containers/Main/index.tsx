import { Outlet, useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useUpdateSequence, useUpdateStatus } from '~/hooks/useControllerTicket';
import ListTicket from './components/ListTicket';
import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { destroySession, getSession } from '~/session';
import { ticketByStatuses } from '~/models/ticket';
import { useStoreData } from '~/hooks/useStoreTicket';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.get('isLoggedIn')) {
    return redirect('/auth/login');
  }

  return json({ ticketByStatuses });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  return redirect('/auth/login', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
}

export default function MainContainers() {
  const data = useLoaderData<typeof loader>();
  const { store, setStore } = useStoreData();
  const updateStatusTicket = useUpdateStatus();
  const updateSequence = useUpdateSequence();

  useEffect(() => {
    if (data) {
      setStore?.(data.ticketByStatuses);
    }
  }, [data, setStore]);

  const handleOnDragEnd = (result: DropResult, _) => {
    if (result.type === 'TICKET' && result.destination) {
      const destinationIdx = result.destination.index;
      const destinationStatus = result.destination.droppableId;
      const sourceIdx = result.source.index;
      const status = result.source.droppableId;

      if (status !== destinationStatus) {
        const ticketStatus = store?.filter((ticketByStatus) => ticketByStatus.status === status)?.[0];
        if (ticketStatus) {
          const selectedTicket = ticketStatus.tickets[sourceIdx];
          updateStatusTicket.mutate(selectedTicket, destinationStatus, destinationIdx);
        }
      } else {
        updateSequence.mutate(status, sourceIdx, destinationIdx);
      }
    }
  };

  return (
    <>
      <div className='w-screen h-screen relative'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <ol className='flex flex-row w-full h-full fixed bg-sky-600 p-6 overflow-x-scroll'>
            {store?.map((ticketByStatus) => (
              <ListTicket
                key={ticketByStatus.status}
                ticketByStatus={ticketByStatus}
              />
            ))}
          </ol>
        </DragDropContext>

        <form method='post'>
          <button
            type='submit'
            className='absolute bottom-5 right-5 h-10 w-10 cursor-pointer z-30'
          >
            <svg
              data-name='logout'
              id='logout'
              viewBox='0 0 1000 1000'
              xmlns='http://www.w3.org/2000/svg'
            >
              <defs></defs>
              <path
                strokeLinecap='round'
                strokeMiterlimit={10}
                strokeWidth={70}
                fill='none'
                stroke='#000000'
                d='M591.61,280.48C693.9,317.86,766.91,416,766.91,531.26c0,147.41-119.5,266.91-266.91,266.91S233.09,678.67,233.09,531.26c0-115.22,73-213.4,175.3-250.78'
              />
              <rect
                fill='#000000'
                height='160.61'
                rx='35.92'
                width='71.84'
                x='464.08'
                y='201.83'
              />
            </svg>
          </button>
        </form>
      </div>
      <Outlet />
    </>
  );
}

