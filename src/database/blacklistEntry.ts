import { BlacklistScope, EntityType } from "../utils/enums.js";

export interface IBlacklistEntry {
  /**
   * The blacklisted ID (role | user | guild)
   */
  id: string;
  /**
   * Indicates who is blacklisted
   *
   * - 1 = role
   * - 2 = user
   * - 3 = guild
   */
  _type: EntityType;
  /**
   * The guild ID where the entity is blacklisted
   */
  guildId?: string;
  /**
   * @deprecated
   * Use {@link scope} instead.
   */
  _module: BlacklistScope;
  /**
   * Indicates from what the user is restricted.
   *
   * - `0` = global
   * - `1` = all (locally)
   * - `2` = tickets
   * - `3` = reports
   * - `4` = tags
   *
   * @deprecated Use `scopes` instead.
   */
  scope: BlacklistScope;
  /**
   * A bitfield indicating the active scopes for this entry. Indicates for what the entity is blacklisted.
   *
   * @see {BlacklistScope}
   *
   * For example, to check if tickets are blacklisted:
   * ```ts
   * const isTicketsBlacklisted = (entry.scopes & BlacklistScope.tickets) === BlacklistScope.tickets;
   * // Or use the helper function
   * const isTicketsBlacklisted = isScopeBlacklisted(entry, BlacklistScope.tickets);
   * ```
   */
  scopes: bigint;
  updatedAt: Date;
  createdAt: Date;
}
