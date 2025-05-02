// Components V2 validators

class ComponentsV2ValidatorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ComponentsV2ValidatorError";
  }
}

import {
  ButtonStyle,
  ChannelType,
  ComponentType,
  SelectMenuDefaultValueType,
} from "discord-api-types/v10";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export const refineURLPredicate =
  (allowedProtocols: string[]) => (value: string) => {
    // eslint-disable-next-line n/prefer-global/url
    const url = new URL(value);
    return allowedProtocols.includes(url.protocol);
  };

const labelPredicate = z.string().min(1).max(80);

export const emojiPredicate = z
  .object({
    id: z.string().optional(),
    name: z.string().min(2).max(32).optional(),
    animated: z.boolean().optional(),
  })
  .strict()
  .refine((data) => data.id !== undefined || data.name !== undefined, {
    message: "Either 'id' or 'name' must be provided",
  });

const buttonPredicateBase = z.object({
  type: z.literal(ComponentType.Button),
  disabled: z.boolean().optional(),
});

const buttonLinkPredicate = buttonPredicateBase
  .extend({
    style: z.literal(ButtonStyle.Link),
    url: z
      .string()
      .url()
      .refine(refineURLPredicate(["http:", "https:", "discord:"])),
    emoji: emojiPredicate.optional(),
    label: labelPredicate,
  })
  .strict();

export const buttonPredicate = z.discriminatedUnion("style", [
  buttonLinkPredicate,
]);

export const actionRowPredicate = z.object({
  type: z.literal(ComponentType.ActionRow),
  components: z.union([
    z
      .object({ type: z.literal(ComponentType.Button) })
      .array()
      .min(1)
      .max(5),
    z
      .object({
        type: z.union([
          z.literal(ComponentType.ChannelSelect),
          z.literal(ComponentType.MentionableSelect),
          z.literal(ComponentType.RoleSelect),
          z.literal(ComponentType.StringSelect),
          z.literal(ComponentType.UserSelect),
          // And this!
          z.literal(ComponentType.TextInput),
        ]),
      })
      .array()
      .length(1),
  ]),
});

/**
 * Parses a value with a given validator, accounting for whether validation is enabled.
 *
 * @param validator - The zod validator to use
 * @param value - The value to parse
 * @param validationOverride - Force validation to run/not run regardless of your global preference
 * @returns The result from parsing
 * @internal
 */
export function validate<Validator extends z.ZodTypeAny>(
  validator: Validator,
  value: unknown
): z.output<Validator> {
  const result = validator.safeParse(value);

  if (!result.success) {
    throw fromZodError(result.error);
  }

  return result.data;
}
