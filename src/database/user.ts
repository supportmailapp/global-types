import { HydratedDocument } from "mongoose";

export interface IDBUser {
  id: string;
  language: string;
  autoRedirect: boolean;
  t_left: number;
  tips: boolean;
  /** @deprecated Use `tokens` instead. */
  accessToken?: string;
  /**
   * JWT encoded tokens.
   *
   * `JWTEncoded<{ at: string, rt: string }>`
   */
  tokens?: string;
  updatedAt: NativeDate;
  createdAt: NativeDate;
}

export type DBUserDocument = HydratedDocument<IDBUser>;
