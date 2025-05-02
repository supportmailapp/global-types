import {
  EntityType,
  NotificationLevel,
  SpecialReportChannelType,
} from "../utils/enums.js";
import { Entity, ICustomModalField } from "../utils/helperTypes.js";

export interface IFeedbackTags {
  [key: string]: string | undefined;
  one?: string;
  two?: string;
  three?: string;
  four?: string;
  five?: string;
}

export interface IFeedbackConfig {
  postId?: string;
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
  forumId?: string;
  tags?: IStatusTags;
  anonym: IAnonym;
  autoForwarding: boolean;
  allowedBots?: string[];
  feedback?: IFeedbackConfig;
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
  channelId?: string;
  actionsEnabled: boolean;
  channels?: ReportChannelSettings;
  pings?: Entity[];
  immune?: Entity[];
  mods?: Entity[];
  limits?: ReportLimitsConfig;
  notificationLevel?: NotificationLevel;
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
