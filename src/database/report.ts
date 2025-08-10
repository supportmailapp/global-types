import { ReportStatus } from "../utils/enums.js";

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
  resolvedAt?: Date;
  resolveComment?: string;
  createdAt: Date;
  updatedAt: Date;
}
