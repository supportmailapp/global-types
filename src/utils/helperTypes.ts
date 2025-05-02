import type {
  APIComponentInContainer,
  APIMediaGalleryComponent,
  APIActionRowComponent,
  APIButtonComponentWithURL,
  APIComponentInMessageActionRow,
  APIUnfurledMediaItem,
  APIContainerComponent,
  APISectionComponent,
} from "discord-api-types/v10";
import type { TextInputStyle } from "discord.js";
import { EntityType } from "./enums";

export type Entity = {
  typ: EntityType;
  id: string;
};

export type IPartialEmoji = {
  name: string;
  id?: string | null;
  animated?: boolean;
};

export interface ICustomModalField {
  /** Min: 1 | Max: 5 */
  position: number;
  label: string;
  placeholder?: string;
  style: TextInputStyle;
  minL?: number;
  maxL?: number;
  _required: boolean;
}

type ReducedAPIComponentInContainer = Exclude<
  APIComponentInContainer,
  | APIMediaGalleryComponent
  | APIActionRowComponent<APIComponentInMessageActionRow>
>;

type ReducedAPIUnfurledMediaItem = Pick<APIUnfurledMediaItem, "url">;
type SMAPIMediaGalleryComponent = Omit<APIMediaGalleryComponent, "items"> & {
  items: ReducedAPIUnfurledMediaItem[];
};

// Create the final type
/**
 * Represents a special type of component that can be used in a container in the SupportMail application.
 *
 * This is a bit different from the original Discord API type, as it excludes certain components that are not used in the app.
 *
 * - Removed is `APIUnfurledMediaItem` - Unfurled media item component
 * - Modified are:
 *   - `APIActionRowComponent<APIComponentInMessageActionRow>` - It can now only hold `APIButtonComponentWithURL` components.
 *   - `APIMediaGalleryComponent` - It can now only hold `ReducedAPIUnfurledMediaItem` components. (basically just the URL)
 *
 * Original: {@link APIComponentInContainer}
 *
 * References:
 * @see
 * - {@link APIActionRowComponent}
 * - {@link APIButtonComponentWithURL}
 * - {@link APIMediaGalleryComponent}
 * - {@link APIUnfurledMediaItem}
 * - {@link APIComponentInMessageActionRow}
 */
export type SMAPIComponentInContainer =
  | ReducedAPIComponentInContainer
  | SMAPIMediaGalleryComponent
  | APIActionRowComponent<APIButtonComponentWithURL>;

/**
 * A special container component that can only hold SMAPIComponentInContainer components.
 *
 * @see {@link SMAPIComponentInContainer}
 */
export type SMAPIContainerComponent = Omit<
  APIContainerComponent,
  "components"
> & {
  components: SMAPIComponentInContainer[];
};

/**
 * A type specialized for the SupportMail app.
 *
 * @see {@link APISectionComponent}
 *
 * Parse to:
 * ```ts
 * {
 *   components: textDisplays,
 *   accessory: button | thumbnail,
 * }
 * ```
 */
export type SMAPISectionComponent = {
  textDisplays?: string[];
  button?: APIButtonComponentWithURL[];
  thumbnail?: Pick<APIUnfurledMediaItem, "url">;
};
