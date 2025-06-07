import { Schema, model } from "mongoose";

export interface ISession {
  _id: Schema.Types.ObjectId;
  userId: string;
  token: string; // Random session token (not JWT)
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
  token: {
    type: String,
    required: true,
    unique: true,
    index: true,
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
