import React, { ReactElement } from 'react';
import { TicketByStatuses } from '~/interfaces/tickets';

interface StoreContextProvider {
  children: ReactElement;
}

export const StoreContext = React.createContext<{
  store?: TicketByStatuses;
  setStore?: React.Dispatch<React.SetStateAction<TicketByStatuses>>;
}>({
  store: [],
  setStore: () => {},
});

export const StoreContextProvider = ({ children }: StoreContextProvider) => {
  const [store, setStore] = React.useState([] as TicketByStatuses);

  const contextValue = {
    store,
    setStore,
  };

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};

