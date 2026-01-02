import { ComponentType } from "discord-api-types/v10";
import { IFormComponent } from "../utils/forms";
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
  /**
   * @deprecated Not used after dashboard is done! Use `isEnabled` instead.
   */
  postId?: string;
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
   * @deprecated File components are not supported in feedback forms.
   */
  components?: IFeedbackFormComponent[];
  thankYou?: string;
  tags?: IFeedbackTags;
}
