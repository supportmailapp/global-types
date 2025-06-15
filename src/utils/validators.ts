// Components V2 validators

import {
  ButtonStyle,
  ComponentType,
  SeparatorSpacingSize,
  type APIActionRowComponent,
  type APIComponentInMessageActionRow,
  type APIContainerComponent,
  type APISectionComponent,
} from "discord-api-types/v10";
import { z } from "zod";
import { fromZodError, ValidationError } from "zod-validation-error";
import type { TopLevelMessageComponent } from "./helperTypes";

const refineURLPredicate = (allowedProtocols: string[]) => (value: string) => {
  const url = new URL(value);
  return allowedProtocols.includes(url.protocol);
};

const labelPredicate = z.string().min(1).max(80);

const emojiPredicate = z
  .object({
    id: z.string().optional(),
    name: z.string().min(2).max(32).optional(),
    animated: z.boolean().optional(),
  })
  .strict()
  .refine((data) => data.id !== undefined || data.name !== undefined, {
    message: "Either 'id' or 'name' must be provided",
  });

const buttonLinkPredicate = z
  .object({
    type: z.literal(ComponentType.Button),
    disabled: z.boolean().optional(),
    style: z.literal(ButtonStyle.Link),
    url: z
      .string()
      .url()
      .refine(refineURLPredicate(["http:", "https:"])),
    emoji: emojiPredicate.optional(),
    label: labelPredicate,
  })
  .strict();

export const buttonPredicate = buttonLinkPredicate;

const actionRowPredicate = z.object({
  type: z.literal(ComponentType.ActionRow),
  components: z
    .object({ type: z.literal(ComponentType.Button) })
    .array()
    .min(1)
    .max(5),
});

const unfurledMediaItemPredicate = z.object({
  url: z
    .string()
    .url()
    .refine(refineURLPredicate(["http:", "https:"]), {
      message:
        "Invalid protocol for media URL. Must be http:, https:, or attachment:",
    }),
});

export const thumbnailPredicate = z.object({
  media: unfurledMediaItemPredicate,
  description: z.string().min(1).max(1_024).nullish(),
  spoiler: z.boolean().optional(),
});

export const separatorPredicate = z.object({
  divider: z.boolean().optional(),
  spacing: z.nativeEnum(SeparatorSpacingSize).optional(),
});

export const textDisplayPredicate = z.object({
  content: z.string().min(1).max(4_000),
});

export const mediaGalleryItemPredicate = z.object({
  media: unfurledMediaItemPredicate,
  description: z.string().min(1).max(1_024).nullish(),
  spoiler: z.boolean().optional(),
});

export const mediaGalleryPredicate = z.object({
  items: z.array(mediaGalleryItemPredicate).min(1).max(10),
});

export const sectionPredicate = z.object({
  components: z.array(textDisplayPredicate).min(1).max(3),
  accessory: z.union([
    z.object({ type: z.literal(ComponentType.Button) }),
    z.object({ type: z.literal(ComponentType.Thumbnail) }),
  ]),
});

export const containerPredicate = z.object({
  components: z
    .array(
      z.union([
        actionRowPredicate,
        mediaGalleryPredicate,
        sectionPredicate,
        separatorPredicate,
        textDisplayPredicate,
      ])
    )
    .min(1)
    .max(10),
  spoiler: z.boolean().optional(),
  accent_color: z.number().int().min(0).max(0xffffff).nullish(),
});

/**
 * Parses a value with a given validator, accounting for whether validation is enabled.
 *
 * @param validator - The zod validator to use
 * @param value - The value to parse
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

const ALLOWED_TLC_TYPES = [
  ComponentType.ActionRow,
  ComponentType.Section,
  ComponentType.Container,
  ComponentType.Separator,
  ComponentType.TextDisplay,
];

export class V2ComponentsValidator {
  private data: unknown;
  constructor(data: any) {
    this.data = data;
  }

  toJSON(): TopLevelMessageComponent[] {
    const clone = structuredClone(this.data) as any[];

    for (const component of clone) {
      switch (component.type) {
        case ComponentType.ActionRow:
          this.validateActionRow(component);
          break;
        case ComponentType.Section:
          this.validateSection(component);
          break;
        case ComponentType.Container:
          this.validateContainer(component);
          break;
        case ComponentType.Separator:
          validate(separatorPredicate, component);
          break;
        case ComponentType.TextDisplay:
          validate(textDisplayPredicate, component);
          break;
        default:
          throw new ValidationError(
            `Invalid top-level component type (${
              (component as any).type
            }) - expected one of: ${ALLOWED_TLC_TYPES.join(", ")}.`
          );
      }
    }

    return clone;
  }

  private validateContainer(container: APIContainerComponent) {
    // Basically the same as for a top-level component, but without the container type
    const clone = structuredClone(container);

    validate(containerPredicate, clone);
  }

  private validateSection(section: APISectionComponent) {
    // Validate the section itself
    validate(sectionPredicate, section);
    // Just the accessory or thumbnail
    if (section.accessory.type === ComponentType.Thumbnail) {
      validate(thumbnailPredicate, section.accessory);
    } else {
      validate(buttonPredicate, section.accessory);
    }
  }

  private validateActionRow(
    row: APIActionRowComponent<APIComponentInMessageActionRow>
  ) {
    validate(actionRowPredicate, row);
    for (const child of row.components) {
      validate(buttonPredicate, child);
    }
  }
}
