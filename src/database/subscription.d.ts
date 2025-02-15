import { HydratedDocument } from "mongoose";
import { BillingPeriod } from "../utils/enums";

export type PriceKey =
  | "gold2weeks"
  | "gold6weeks"
  | "gold2months"
  | "gold1year";

export interface ISubscription {
  /**
   * The server ID that the subscription is for
   */
  serverId: string;
  /**
   * The user ID that the subscription is for
   */
  userId: string;
  /**
   * The customer ID from Stripe
   */
  customerId: string;
  /**
   * The subscription ID from Stripe
   */
  subscriptionId: string;
  /**
   * The product ID from Stripe
   */
  productId: string;
  /**
   * The date of the last payment
   */
  lastPayment: Date | null;
  /**
   * The billing period of the subscription
   */
  billingPeriod: BillingPeriod;
  /**
   * The end date of the trial
   */
  trialEnd: Date | null;
  /**
   * The status of the subscription
   *
   * - `trial` - The subscription is in a trial period
   * - `pending` - The subscription is pending (e.g. the user has not paid yet)
   * - `active` - The subscription is active
   * - `canceled` - The subscription has been canceled
   */
  status: "trial" | "pending" | "active" | "canceled";
  /**
   * The date the subscription was canceled
   */
  canceledAt?: Date;
  /**
   * A note about the subscription (e.g. why it was canceled)
   */
  note?: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
}

export type DBSubscriptionDocument = HydratedDocument<ISubscription>;
