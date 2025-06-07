import { Schema, model } from "mongoose";

export interface ISession {
  _id: Schema.Types.ObjectId;
  userId: string;
  /**
   * JWT encoded tokens.
   *
   * `JWTEncoded<{ at: string, rt: string }>`
   */
  tokens?: string;
  expiresAt: Date;
  lastActivity: Date;
  userAgent?: string;
  ipAddress?: string;
  createdAt: Date;
}

const sessionSchema = new Schema<ISession>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  tokens: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expireAfterSeconds: 0 }, // MongoDB TTL index for auto-cleanup
  },
  lastActivity: {
    type: Date,
    default: new Date(),
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  userAgent: String,
  ipAddress: String,
});

export const Session = model<ISession>("Session", sessionSchema, "sessions");
