import { HydratedDocument } from "mongoose";
import { ReportStatus } from "../utils/enums";

export interface IReport {
  reportId: string;
  userId: string;
  guildId: string;
  authorId: string;
  reason: string;
  logMessage?: string; // "channelId-messageId"
  message: string;
  status: ReportStatus;
  comment?: string;
  resolvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type DBReportDocument = HydratedDocument<IReport>;
