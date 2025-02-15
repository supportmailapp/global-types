import { HydratedDocument } from "mongoose";

export interface IDBUser {
  id: string;
  language: string;
  autoRedirect: boolean;
  t_left: number;
  tips: boolean;
  accessToken?: string;
  updatedAt: NativeDate;
  createdAt: NativeDate;
}

export type DBUserDocument = HydratedDocument<IDBUser>;
