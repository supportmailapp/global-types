import { TicketState, TicketStatus } from "../utils/enums.js";

export interface IFeedbackAnswer {
  question: string;
  answer: string;
}

export interface IFeedback {
  stars: number;
  questionAnswers: IFeedbackAnswer[];
  /**
   * @deprecated Not used after dashboard is done!
   */
  messageId: string;
}

export interface ITicket {
  id: string;
  /**
   * Alias of the user if the ticket is anonymous
   */
  alias?: string;
  userId: string;
  guildId: string;
  forumId: string;
  postId: string;
  count: number;
  status: TicketStatus;
  closeComment?: string;
  lastActive: string; // For sorting purposes
  feedback?: IFeedback;
  stateTag?: TicketState; // For tag management (indicates which tag should be applied atm)
  createdAt: Date;
  updateAt: Date;
}
