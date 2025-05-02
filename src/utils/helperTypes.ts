import {
  type APIComponentInContainer,
  type APIMediaGalleryComponent,
  type APIActionRowComponent,
  type APIButtonComponentWithURL,
  type APIComponentInMessageActionRow,
  type APIUnfurledMediaItem,
  type APIContainerComponent,
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

type APIComponentInContainerWithoutMediaGallery = Exclude<
  APIComponentInContainer,
  | APIMediaGalleryComponent
  | APIActionRowComponent<APIComponentInMessageActionRow>
  | APIUnfurledMediaItem
>;

// Create the final type
/**
 * Represents a special type of component that can be used in a container in the SupportMail application.
 *
 * This is a bit different from the original Discord API type, as it excludes certain components that are not used in the app.
 *
 * - Removed are:
 *   - `APIMediaGalleryComponent` - Media gallery component
 *   - `APIUnfurledMediaItem` - Unfurled media item component
 * - Modified is the `APIActionRowComponent<APIComponentInMessageActionRow>` - It can now only hold `APIButtonComponentWithURL` components.
 *
 * @see {@link APIComponentInContainer}
 * @see {@link APIActionRowComponent}
 * @see {@link APIButtonComponentWithURL}
 * @see {@link APIMediaGalleryComponent}
 * @see {@link APIUnfurledMediaItem}
 * @see {@link APIComponentInMessageActionRow}
 */
export type SMAPIComponentInContainer =
  | APIComponentInContainerWithoutMediaGallery
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
