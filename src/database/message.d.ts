import { HydratedDocument } from "mongoose";

export interface IDBMessage {
  watch: string;
  edit: string;
  guildId: string;
  ticketId: string;
}

export type DBMessageDocument = HydratedDocument<IDBMessage>;
