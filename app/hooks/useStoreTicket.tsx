import * as React from 'react';
import { StoreContext } from '~/context/StoreTicketContext';

export const useStoreData = () => {
  return React.useContext(StoreContext);
};

