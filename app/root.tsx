import type { LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, MetaFunction, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import styles from './tailwind.css';
import { StoreContextProvider } from './context/StoreTicketContext';

export const meta: MetaFunction = () => {
  return [
    { title: 'Ngudiang App' },
    {
      property: 'og:title',
      content: 'Ngudiang App',
    },
    {
      name: 'description',
      content: 'Ngudiang App is a todo or kanban app',
    },
  ];
};

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function App() {
  return (
    <html
      className='h-full antialiased scroll-smooth'
      lang='en'
    >
      <head>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <Meta />
        <Links />
      </head>
      <body className='flex h-full flex-col bg-gray-50'>
        <StoreContextProvider>
          <Outlet />
        </StoreContextProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

