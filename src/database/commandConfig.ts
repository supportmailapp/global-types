/**
 * A general interface for command configurations.
 */
export interface ICommandConfig {
  /**
   * The unique command ID.
   *
   * - If `guildId == null`, this is unique globally.
   * - If `guildId != null`, this is unique per guild.
   */
  id: string;
  /**
   * The name(s) of the command.
   *
   * Schema: `/<command>/<subgroup|subcommand>/<subcommand>`
   *
   * ### Examples:
   * - `/foo` - `"foo"`
   * - `/foo bar` - `"foo/bar"`
   * - `/foo bar baz` - `"foo/bar/baz"`
   */
  commandPath: string;
  /**
   * The guild ID this command is for.
   *
   * Currently not in use, but may be used in the future for custom commands?
   */
  guildId: string | null;
  /**
   * The channels this command can be used in.
   */
  channels: string[];
  /**
   * The roles this command can be used by.
   *
   * - If the id matches the guild ID, it's \@everyone.
   * - If empty, don't check for roles.
   * - If `roles`, `users`, and `permissions` are all empty, check for MANAGE_GUILD permissions!
   */
  roles: string[];
  /**
   * The users this command can be used by.
   *
   * - If empty, don't check for users.
   * - If `roles`, `users`, and `permissions` are all empty, check for MANAGE_GUILD permissions!
   */
  users: string[];
  /**
   * The permissions this command can be used with.
   *
   * - If empty, don't check for permissions.
   * - If `roles`, `users`, and `permissions` are all empty, check for MANAGE_GUILD permissions!
   */
  permissions: bigint[];
}