import { HydratedDocument } from "mongoose";

export interface ITag {
  guildId: string;
  name: string;
  content?: string;
  onlyTickets: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type DBTagDocument = HydratedDocument<ITag>;
