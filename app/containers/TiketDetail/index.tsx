import { IconButton } from '~/components/IconButton';
import { useNavigate, useParams } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import Description from './components/Description';
import TitleTicket from './components/TitleTicket';
import useControllerData from '~/hooks/useControllerTicket';
import Status from './components/Status';
import dayjs from 'dayjs';

export default function TicketDetailContainer() {
  const navigate = useNavigate();
  const dialogContentRef = useRef<HTMLDivElement>(null);

  const params = useParams();
  const { getTicketById } = useControllerData();
  const ticketId = params['ticketId'];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!dialogContentRef.current?.contains?.(e.target as Node)) {
        navigate('/');
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  const ticket = getTicketById(Number(ticketId));

  if (Object.keys(ticket ?? {}).length === 0) {
    return null;
  }

  return (
    <>
      <div className='left-0 top-0 absolute'>
        <div className='fixed w-full h-screen box-border justify-center flex items-start overflow-auto z-10'>
          <div className='bg-transparent relative w-auto my-12 max-md:m-4'>
            <div
              ref={dialogContentRef}
              className='w-[768px] max-md:w-[calc(100vw-16px*2)] rounded-xl box-border overflow-hidden bg-gray-100'
            >
              <div className='block w-full'>
                <div className='min-h-[600px]'>
                  <div className='absolute right-4 top-4'>
                    <IconButton
                      appearance='subtle'
                      onClick={() => navigate('/')}
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
                  <div className='p-6 w-full'>
                    <div className='w-full'>
                      <TitleTicket defaultTitle={ticket?.title} />
                      <div className='my-1 ml-0.5'>
                        <p className='text-sm text-slate-600'>
                          Created on {dayjs(ticket?.created_at).format('DD MMMM YYYY, HH:mm')}
                        </p>
                      </div>
                    </div>

                    <div className='mt-6'>
                      <h3 className='text-base font-semibold text-blue-950'>Status</h3>
                      <Status />
                    </div>

                    <div className='mt-6'>
                      <h3 className='text-base font-semibold text-blue-950'>Description</h3>

                      <div className='mt-4 text-sm text-blue-950 font-normal'>
                        <Description defaultDescription={ticket?.content ?? ''} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='fixed w-full h-screen box-border bg-black opacity-70' />
      </div>
    </>
  );
}

