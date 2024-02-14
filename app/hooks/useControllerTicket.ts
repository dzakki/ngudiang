import { Ticket } from '~/interfaces/tickets';
import { useStoreData } from './useStoreTicket';
import { useCallback, useState } from 'react';
import { sleep } from '~/utils';

export const useGetTicketById = () => {
  const { store } = useStoreData();

  const getTicketById = useCallback(
    async (id: number) => {
      try {
        return store?.flatMap((taskByStatus) => taskByStatus.tickets).find((ticket) => ticket.id === id);
      } catch (error) {
        return undefined;
      }
    },
    [store]
  );

  return {
    fetch: getTicketById,
    fetchSync: useCallback(
      (id: number) => store?.flatMap((taskByStatus) => taskByStatus.tickets).find((ticket) => ticket.id === id),
      [store]
    ),
  };
};

export const useAddData = () => {
  const { setStore } = useStoreData();
  const [isLoading, setIsLoading] = useState(false);

  return {
    mutate: useCallback(
      async (ticket: Ticket) => {
        try {
          setIsLoading(true);
          await sleep();
          setStore?.((prev) => {
            return [...prev].map((taskByStatus) => {
              const tickets = [...taskByStatus.tickets];
              if (ticket.status === taskByStatus.status) {
                tickets.push(ticket);
              }
              return {
                ...taskByStatus,
                tickets,
              };
            });
          });
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      },
      [setStore]
    ),
    isLoading,
  };
};

export const useUdateContentTicket = () => {
  const { setStore } = useStoreData();
  const getTicketById = useGetTicketById();
  const [isLoading, setIsLoading] = useState(false);

  return {
    mutate: useCallback(
      async (content: string, id: number) => {
        try {
          setIsLoading(true);
          await sleep(1000);
          const currentTicket = await getTicketById.fetch(id);
          if (currentTicket) {
            const updatedTicket = {
              ...currentTicket,
              content,
            };
            setStore?.((prev) => {
              return [...prev].map((taskByStatus) => {
                return {
                  ...taskByStatus,
                  tickets: taskByStatus.tickets.map((ticket) => {
                    if (ticket.id === id) {
                      return updatedTicket;
                    }
                    return ticket;
                  }),
                };
              });
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      },
      [getTicketById, setStore]
    ),
    isLoading,
  };
};

export const useUpdateStatus = () => {
  const { setStore } = useStoreData();
  const [isLoading, setIsLoading] = useState(false);

  return {
    mutate: useCallback(
      async (ticket: Ticket, toStatus: string, sequence?: number) => {
        try {
          setIsLoading(true);
          setStore?.((prev) => {
            return [...prev].map((taskByStatus) => {
              if (ticket.status === 'Completed') {
                return taskByStatus;
              } else if (taskByStatus.status === toStatus) {
                const tickets = [...taskByStatus.tickets];

                tickets.splice(sequence ?? 0, 0, {
                  ...ticket,
                  status: toStatus,
                });

                return {
                  ...taskByStatus,
                  tickets,
                };
              } else if (ticket.status === taskByStatus.status) {
                return {
                  ...taskByStatus,
                  tickets: taskByStatus.tickets.filter((_ticket) => _ticket.id !== ticket.id),
                };
              }
              return taskByStatus;
            });
          });
          await sleep(1000);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      },
      [setStore]
    ),
    isLoading,
  };
};

export const useUpdateSequence = () => {
  const { setStore } = useStoreData();

  return {
    mutate: useCallback(
      (status: string, fromSequence: number, toSequence: number) => {
        setStore?.((prev) => {
          return [...prev].map((taskByStatus) => {
            if (taskByStatus.status === status) {
              const tickets = [...taskByStatus.tickets];
              tickets.splice(toSequence, 0, tickets.splice(fromSequence, 1)[0]);
              return {
                ...taskByStatus,
                tickets,
              };
            }
            return taskByStatus;
          });
        });
      },
      [setStore]
    ),
  };
};

export const useUpdateTitleTicket = () => {
  const { setStore } = useStoreData();
  const { fetchSync: getTicketById } = useGetTicketById();
  return {
    mutate: useCallback(
      (title: string, id: number) => {
        const currentTicket = getTicketById(id);
        if (currentTicket) {
          const updatedTicket = {
            ...currentTicket,
            title,
          };
          setStore?.((prev) => {
            return [...prev].map((taskByStatus) => {
              return {
                ...taskByStatus,
                tickets: taskByStatus.tickets.map((ticket) => {
                  if (ticket.id === id) {
                    return updatedTicket;
                  }
                  return ticket;
                }),
              };
            });
          });
        }
      },
      [getTicketById, setStore]
    ),
  };
};

