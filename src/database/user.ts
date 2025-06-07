import type { ISession } from "./session";

export interface IDBUser {
  id: string;
  language: string;
  autoRedirect: boolean;
  t_left: number;
  tips: boolean;
  /** @deprecated
   * - Use `Session.tokens` instead.
   * {@link ISession}
   * */
  accessToken?: string;
  updatedAt: Date;
  createdAt: Date;
}
