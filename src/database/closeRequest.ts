import { HydratedDocument } from "mongoose";

export interface CloseRequestComment {
  text?: string;
  private?: boolean;
}

export interface ICloseRequest {
  ticketId: string;
  postId: string;
  author: string; // User ID
  createdAt: NativeDate;
  updatedAt: NativeDate;
  closeTime?: string; // Only given if should be auto-closed
  dmMessage: string;
  guildMessage: string;
  comment?: CloseRequestComment;
}

export type CloseRequestDocument = HydratedDocument<ICloseRequest>;
