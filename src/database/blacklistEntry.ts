import { HydratedDocument } from "mongoose";
import { BlacklistEntryType, BlacklistModule } from "../utils/enums";

export interface IBlacklistEntry {
  /**
   * The blacklisted ID (role | user | guild)
   */
  id: string;
  /**
   * Indicates what is blacklisted
   *
   * - 1 = role
   * - 2 = user
   * - 3 = guild
   */
  _type: BlacklistEntryType;
  /**
   * The guild ID where the entity is blacklisted
   */
  guildId?: string;
  /**
   * Indicates from what the user is restricted.
   *
   * - `0` = global
   * - `1` = all (locally)
   * - `2` = tickets
   * - `3` = reports
   * - `4` = tags
   */
  _module: BlacklistModule;
  updatedAt: Date;
  createdAt: Date;
}

export type BlacklistEntryDocument = HydratedDocument<IBlacklistEntry>;
