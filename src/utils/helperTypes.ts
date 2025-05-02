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

export type TopLevelMessageComponent = Exclude<
  APIMessageTopLevelComponent,
  APIFileComponent | APIMediaGalleryComponent
>;
