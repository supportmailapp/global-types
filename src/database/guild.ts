import {
  EntityType,
  ReportNotificationType,
  SpecialReportChannelType,
} from "../utils/enums.js";
import { ICustomModalField, MentionableEntity } from "../utils/helperTypes.js";

export interface IFeedbackTags {
  [key: string]: string | undefined;
  one?: string;
  two?: string;
  three?: string;
  four?: string;
  five?: string;
}

export interface IFeedbackConfig {
  /**
   * @deprecated Not used after dashboard is done! Use `enabled` instead.
   */
  postId?: string;
  enabled: boolean;
  questions?: ICustomModalField[];
  thankYou?: string;
  tags?: IFeedbackTags;
}

export interface IAnonym {
  /**
   * Indicates if the user can create an ticket anonymously.
   */
  user: boolean;
  enabled: boolean;
  /**
   * @deprecated Not used currently. Will be re-enabled with premium.
   */
  alias?: string;
}

export interface IStatusTags {
  [key: string]: string | undefined;
  open?: string;
  closed?: string;
  unanswered?: string;
  pendingQR?: string;
  uResponded?: string;
  awaitingRes?: string;
}

export type PausedUntil = {
  value: boolean;
  date: Date | null;
};

export interface ITicketConfig {
  enabled: boolean;
  pausedUntil?: PausedUntil | null;
  forumId: string | null;
  tags?: IStatusTags;
  anonym: IAnonym;
  autoForwarding: boolean;
  allowedBots?: string[];
  feedback?: IFeedbackConfig;
  /**
   * Webhook ID for the log in a ticket post when a /send command is used.
   *
   * This is used to log the message in the ticket post when a mod sends a message using the `/send` command.
   */
  webhookDocId?: string;
}

export type ISpecialReportChannel = {
  t: SpecialReportChannelType;
  id: string;
};

export interface ReportChannelSettings {
  setting: "IN" | "EX"; // IN = Include, EX = Exclude
  ids: ISpecialReportChannel[];
}

export interface ReportLimitsConfig {
  /** Number of open reports a user can receive @default 1 @maxConfig `10` */
  perUserReceive?: number;
  /** Number of open reports a user can create @default 5 @maxConfig `50` */
  perUserCreate?: number;
  /** Number of open reports the guild can have @default 20 @maxConfig `100` */
  opens?: number;
}

export interface IReportConfig {
  enabled: boolean;
  pausedUntil?: PausedUntil | null;
  channelId: string | null;
  actionsEnabled: boolean;
  channels?: ReportChannelSettings;
  pings?: MentionableEntity[];
  immune?: MentionableEntity[];
  mods?: MentionableEntity[];
  limits?: ReportLimitsConfig;
  notifications?: ReportNotificationType[];
}

export interface IGuildFlags {
  /**
   * Indicates if the guild is blacklisted (restricted from using the app)
   */
  blacklisted: boolean;
  /**
   * Date when the config should be deleted after the bot left the guild
   */
  deleteAfter: Date | null;
  /**
   * Indicates if the guild is a partner guild
   */
  partner: boolean;
}

export type BlacklistImmunityEntry = [EntityType, string]; // [ type, "id" ]

export interface IDBGuild {
  /**
   * The Guild ID.
   */
  id: string;
  icon: string;
  name: string;
  lang: string;
  ticketConfig: ITicketConfig;
  reportConfig: IReportConfig;
  blacklistImmune?: BlacklistImmunityEntry[]; // [ [ type, "id" ] ]
  flags: IGuildFlags;
  createdAt: Date;
}
