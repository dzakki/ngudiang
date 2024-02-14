import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { Button } from '~/components/Button';
import CardTicket from './CardTicket';
import { useUpdateStatus } from '~/hooks/useControllerTicket';
import FormAddTicket from './FormAddTicket';
import { TicketByStatus } from '~/interfaces/tickets';
import Loading from '~/components/Loading';

interface ListTicketProps {
  ticketByStatus: TicketByStatus;
}

export default function ListTicket({ ticketByStatus }: ListTicketProps) {
  const [isAdding, setIsAdding] = React.useState(false);
  const { isLoading } = useUpdateStatus();

  const { status, tickets } = ticketByStatus;

  return (
    <li className='max-h-full px-2 scroll-smooth'>
      <div className='bg-gray-200 max-h-full w-[272px] rounded-xl shadow-md relative box-border align-top px-1.5 flex flex-col'>
        <div className='px-2 pt-2'>
          <div className='min-h-5 flex flex-row items-center'>
            {isLoading && (
              <div>
                <Loading className='h-3.5 text-black mr-1 ml-0' />
              </div>
            )}
            <h2 className='block text-sm font-semibold leading-5 px-2 py-1.5'>{status}</h2>
          </div>
        </div>
        <Droppable
          droppableId={status}
          type='TICKET'
        >
          {(dropProvided) => (
            <ol
              className='py-1 px-0.5 h-full overflow-x-hidden overflow-y-auto z-[1] flex flex-col flex-auto'
              {...dropProvided.droppableProps}
              ref={dropProvided.innerRef}
            >
              {tickets.map((ticket, index) => (
                <CardTicket
                  key={ticket.id}
                  ticket={ticket}
                  index={index}
                />
              ))}
              <FormAddTicket
                isVisible={isAdding}
                status={status}
                setIsVisible={(val) => setIsAdding(val)}
              />
              {dropProvided.placeholder}
            </ol>
          )}
        </Droppable>
        {!isAdding && (
          <div className='p-2'>
            <Button
              shouldFitContainer
              appearance='subtle'
              className='text-start text-sm leading-8'
              spacing='compact'
              iconBefore={
                <svg
                  width='14'
                  height='14'
                  role='presentation'
                  focusable='false'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z'
                    fill='currentColor'
                  ></path>
                </svg>
              }
              onClick={() => setIsAdding(true)}
            >
              Add a card
            </Button>
          </div>
        )}
      </div>
    </li>
  );
}

