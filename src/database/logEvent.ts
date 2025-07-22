import { LogEventType } from "../utils/enums";

interface IBaseLogEvent {
  typ: LogEventType;
  guildId: string;
  timestamp: Date;
  reason?: string;
  extra?: Record<string, string | number | boolean>;
}

type TicketCreatedEvent = IBaseLogEvent & {
  typ: LogEventType.TicketCreated;
  extra: {
    ticketId: string;
  };
};

type TicketClosedEvent = IBaseLogEvent & {
  typ: LogEventType.TicketClosed;
  extra: {
    ticketId: string;
    /**
     * User ID of the person who closed the ticket.
     */
    userId: string;
  };
};

type TicketReopenedEvent = IBaseLogEvent & {
  typ: LogEventType.TicketReopened;
  extra: {
    ticketId: string;
    /**
     * User ID of the person who reopened the ticket.
     */
    userId: string;
  };
};

type TicketDeletedEvent = IBaseLogEvent & {
  typ: LogEventType.TicketDeleted;
  extra: {
    ticketId: string;
    /**
     * User ID of the person who deleted the ticket.
     */
    userId: string;
  };
};

type TestLogEvent = IBaseLogEvent & {
  typ: LogEventType.TestEvent;
};

export type TLogEvent =
  | TestLogEvent
  | TicketCreatedEvent
  | TicketClosedEvent
  | TicketReopenedEvent
  | TicketDeletedEvent;
