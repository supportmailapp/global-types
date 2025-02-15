import { HydratedDocument } from "mongoose";
import { PriceKey } from "./subscription";

/**
 * Holds the information about a Stripe Checkout session
 */
export interface ICheckoutSession {
  /**
   * The ID of the session
   */
  id: string;
  /**
   * The guild ID associated with the session
   */
  guildId: string;
  /**
   * The ID of the user who issued the session
   */
  userId: string;
  /**
   * The URL to redirect the user to
   */
  url: string;
  /**
   * The price key of the subscription
   *
   * This ensures that the user can change their mind and select a different subscription.
   */
  plan: PriceKey;
  createdAt: Date;
  updatedAt: Date;
}

export type CheckoutSessionDocument = HydratedDocument<ICheckoutSession>;
