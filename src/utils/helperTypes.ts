import type {
  APIActionRowComponent,
  APIButtonComponentWithURL,
  APIComponentInContainer,
  APIComponentInMessageActionRow,
  APIContainerComponent,
  APIFileComponent,
  APIMediaGalleryComponent,
  APIMessageTopLevelComponent,
  APISectionComponent,
  APISeparatorComponent,
  APITextDisplayComponent,
  APIUnfurledMediaItem,
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

export type ReducedAPIComponentInContainer = Exclude<
  APIComponentInContainer,
  | APIMediaGalleryComponent
  | APIActionRowComponent<APIComponentInMessageActionRow>
>;

export type MediaItemURLOnly = Pick<APIUnfurledMediaItem, "url">;
export type SMAPIFileComponent = Omit<APIFileComponent, "file"> & {
  file: MediaItemURLOnly;
};
export type SMAPIMediaGalleryComponent = Omit<
  APIMediaGalleryComponent,
  "items"
> & {
  items: MediaItemURLOnly[];
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
  | APIActionRowComponent<APIButtonComponentWithURL>
  | SMAPIFileComponent;

/**
 * @see {@link APISectionComponent}
 */
export type SMAPISectionComponent = Omit<APISectionComponent, "accessory"> & {
  accessory?: APIButtonComponentWithURL | MediaItemURLOnly;
};

/**
 * A special container component holding all information about the container.
 */
export type SMAPIContainerComponent = Omit<
  APIContainerComponent,
  "components"
> & {
  components: SMAPIComponentInContainer[];
};

/**
 * Modified version of the `APIMessageTopLevelComponent` type.
 *
 * @see {@link APIMessageTopLevelComponent}
 */
export type SMAPIMessageTopLevelComponent =
  | APIActionRowComponent<APIButtonComponentWithURL>
  | APISeparatorComponent
  | APITextDisplayComponent
  | SMAPIContainerComponent
  | SMAPIMediaGalleryComponent
  | SMAPISectionComponent;
