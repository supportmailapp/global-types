export interface IBotVote {
  userId: string;
  botId: string;
  /**
   * Whether the user has the vote role
   *
   *
   */
  hasRole: boolean;
  /**
   * Whether the user has the vote role | Only given, when role was successfully applied
   *
   * @default false
   */
  removeRoleBy?: Date | undefined;
}
