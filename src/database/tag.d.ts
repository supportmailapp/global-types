import { HydratedDocument } from "mongoose";

export interface ITag {
  guildId: string;
  name: string;
  content?: string;
  onlyTickets: boolean;
  createdAt: NativeDate;
  updatedAt: NativeDate;
}

export type DBTagDocument = HydratedDocument<ITag>;
