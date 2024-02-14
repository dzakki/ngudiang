import { Link } from '@remix-run/react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Ticket } from '~/interfaces/tickets';

interface CardTicketProps {
  ticket: Ticket;
  containerProps?: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
}

export default function CardTicket({ ticket, containerProps = {} }: CardTicketProps) {
  const { className, draggable, ...liProps } = containerProps;
  return (
    <li
      className={twMerge(clsx('pb-2 w-full select-none', className))}
      draggable={draggable ?? true}
      {...liProps}
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
  );
}

