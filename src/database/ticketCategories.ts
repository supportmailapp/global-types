// @ts-nocheck | TODO: Fix types
import { Entity, ICustomModalField, IPartialEmoji, MentionableEntity } from "../utils/helperTypes";

export interface ITicketCategory {
  /**
   * The ID of the guild (server) this ticket category belongs to.
   */
  guildId: string;
  /**
   * Whether this ticket category is currently enabled.
   */
  enabled: boolean;
  /**
   * The position index of this category in the list of categories.
   */
  index: number;
  /**
   * The display name of this ticket category.
   *
   * - Max length: 45 characters
   * - Min length: 3 character
   */
  label: string;
  /**
   * Optional emoji associated with this category.
   */
  emoji?: IPartialEmoji;
  /**
   * The Tag ID that should be used for this category.
   *
   * Because it's in a forum channel...
   */
  tag: string;
  /**
   * Optional array of entities to ping when a ticket of this category is created.
   */
  pings?: MentionableEntity[];
  /**
   * Custom Modal fields to be displayed in the ticket creation modal.
   */
  fields: ICustomModalField[];
  /**
   * The ObjectId referece of a custom message.
   *
   * Is sent after the user created the ticket.
   */
  customMessageId: string;
}
