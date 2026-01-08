import { ComponentType } from "discord-api-types/v10";
import { AnyAPIFeedbackFormComponent, IFormComponent } from "../utils/forms";
import { ICustomModalField } from "../utils/helperTypes";

export interface IFeedbackTags {
  [key: string]: string | undefined; // This missing means TS issues
  one?: string;
  two?: string;
  three?: string;
  four?: string;
  five?: string;
}

export type IFeedbackFormComponent = Exclude<IFormComponent, { type: ComponentType.File }>;

export interface IFeedbackConfig {
  guildId: string;
  channelId?: string;
  isEnabled: boolean;
  /**
   * Custom questions to ask the user after closing the ticket.
   *
   * @deprecated Use `components` instead.
   */
  questions?: ICustomModalField[];
  /**
   * Custom components to show in the feedback form.
   *
   * Note, File components are not supported in feedback forms.
   */
  components?: IFeedbackFormComponent[];
  thankYou?: string;
  tags?: IFeedbackTags;
}

export type APIFeedbackConfig = Omit<IFeedbackConfig, "components"> & {
  /**
   * Custom components to show in the feedback form.
   *
   * Note, File components are not supported in feedback forms.
   */
  components?: AnyAPIFeedbackFormComponent[];
};

export interface IFeedbackAnswer {
  questionId: string;
  label: string;
  answer: string;
}

export interface IFeedback {
  guildId: string;
  ticketId: string;
  rating: number;
  /**
   * A mapping of question IDs to answers.
   */
  answers: IFeedbackAnswer[];
  timestamp: Date;
}

export type APIFeedback = Omit<IFeedback, "timestamp"> & {
  /** ISO 8601 timestamp */
  timestamp: string;
};
