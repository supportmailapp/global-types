export interface IDBUser {
  id: string;
  language: string;
  autoRedirect: boolean;
  t_left: number;
  tips: boolean;
  /** @deprecated
   * - Use `UserToken` Schema instead.
   * */
  accessToken?: string;
  updatedAt: Date;
  createdAt: Date;
}
