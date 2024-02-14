import { Link } from '@remix-run/react';
import { Draggable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Ticket } from '~/interfaces/tickets';

interface CardTicketProps {
  ticket: Ticket;
  containerProps?: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
  index: number;
}

export default function CardTicket({ ticket, index, containerProps = {} }: CardTicketProps) {
  const {
    className,
    ...liProps
  } = containerProps;
  return (
    <Draggable
      key={ticket.id}
      draggableId={ticket.id.toString()}
      index={index}
      isDragDisabled={ticket.status === 'Completed'}
    >
      {(provided) => (
        <li
          className={twMerge(clsx('pb-2 w-full select-none', className))}
          {...liProps}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            draggable={false}
            className='bg-white rounded-lg shadow-sm w-full min-h-10 relative cursor-pointer text-blue-950'
          >
            <Link
              to={`/ticket/${ticket.id}`}
              draggable={false}
            >
              <div
                className='min-h-6 px-3 py-2'
                draggable={false}
              >
                {ticket.title}
              </div>
            </Link>
          </div>
        </li>
      )}
    </Draggable>
  );
}

