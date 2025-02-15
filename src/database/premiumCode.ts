import { HydratedDocument } from "mongoose";

/**
 * The options for the grant code - a simple object. Every value that is true should be granted.
 */
export interface IGrantCodeOptions {
  /**
   * When the granted benefits end.
   *
   * If null, the benefits are permanent.
   */
  endsAt: Date | null;
  /**
   * If the granted Premium is is equivalent to a gold subscription.
   */
  gold?: boolean;
  /**
   * @deprecated Currently not used.
   */
  diamond?: boolean;
  /**
   * Grant the user the ability to use custom messages.
   */
  customMessages?: boolean;
  /**
   * Grant the user the ability to create more tags.
   */
  moreTags?: boolean;
  /**
   * Grant the user the ability to customize the anonym alias.
   */
  anonymAlias?: boolean;
  /**
   * Grant the user the ability to configure custom feedback questions.
   */
  feedbackQuestions?: boolean;
}

export interface IPremiumCode {
  /**
   * The details, what the code grants.
   */
  grants: IGrantCodeOptions;
  /**
   * The user ID that can redeem this code.
   */
  targetUserId: string;
  /**
   * The guild ID where the code can be redeemed.
   *
   * If not set, the code can be redeemed in any guild.
   */
  guildId?: string;
  /**
   * The date when the code was used.
   *
   * As long as this is null, the code is not used.
   */
  usedAt?: Date;
  /**
   * The date when the code expires.
   */
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ### Flow
 * 1. `/admin premium generate-code ` with all options
 * 2. DB code is created
 * 3. JWT is created with the _id in the payload and signed with the secret
 * 4. Respond with the JWT.
 */
export type PremiumCodeDocument = HydratedDocument<IPremiumCode>;
