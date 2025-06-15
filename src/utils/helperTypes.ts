import type {
  APIFileComponent,
  APIMediaGalleryComponent,
  APIMessageTopLevelComponent,
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

export type ICustomMessage = {
  /**
   * The content of the message.
   */
  content?: string;
  /**
   * The integer of the hex-color to use for the embed.
   */
  color?: number;
  /**
   * The URL to the image to use as the large embed image.
   */
  image?: string;
};
