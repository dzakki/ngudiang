import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { commitSession, getSession } from '~/session';

export async function loader({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('isLoggedIn')) {
    // Redirect to the home page if they are already signed in.
    return redirect('/');
  }

  const data = { error: session.get('error') };

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');

  if (email === 'test@vroom.com.au' && password === 'frontendtest2024') {
    session.set('isLoggedIn', true);

    const commit = await commitSession(session);
    return redirect('/', {
      headers: {
        'Set-Cookie': commit,
      },
    });
  }

  session.flash('error', 'Invalid email/password');

  return redirect('/login', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function LoginContainer() {
  const { error } = useLoaderData<typeof loader>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (error) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  }, [error]);

  return (
    <div className='md:m-auto my-auto max-md:px-5'>
      <div className='bg-white shadow md:w-[400px] w-full py-10 max-md:py-8 px-8 max-md:px-6 rounded-xl'>
        <div className='mb-4'>
          <h1 className='text-3xl font-bold text-center text-blue-950'>Ngudiang</h1>
          <h5 className='text-base text-center font-semibold mt-4 text-blue-950'>Login to Ngudiang</h5>
        </div>
        <form method='post'>
        <div className={clsx('text-blue-950 w-full font-semibold p-2 mb-4 bg-rose-100 rounded-lg', !isError  && 'hidden')}>{error}</div>
          <div className='mb-4'>
            <Input
              placeholder='Enter email'
              type='email'
              name='email'
              defaultValue=''
              required
            />
          </div>
          <div className='mb-4'>
            <Input
              placeholder='Enter password'
              type='password'
              name='password'
              defaultValue=''
              required
            />
          </div>
          <Button
            shouldFitContainer
            className='text-center'
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

