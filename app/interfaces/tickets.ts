export interface Ticket {
  id: number;
  title: string;
  content: string;
  status: string;
  created_at?: string;
}

export interface TicketByStatus {
  status: string;
  tickets: Ticket[];
}

export type TicketByStatuses = TicketByStatus[]
