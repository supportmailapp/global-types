import type {
  APIFileComponent,
  APIMediaGalleryComponent,
  APIMessageTopLevelComponent,
} from "discord-api-types/v10";
import type { TextInputStyle } from "discord.js";
import { EntityType } from "./enums";

export type Entity<T extends EntityType> = {
  typ: T;
  id: string;
};

export type UserEntity = Entity<EntityType.user>;
export type GuildEntity = Entity<EntityType.guild>;
export type RoleEntity = Entity<EntityType.role>;
export type MentionableEntity = UserEntity | RoleEntity;
export type AnyEntity = UserEntity | GuildEntity | RoleEntity;

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

/**
 * Does the `1 << n` operation.
 *
 * Example: You wanna check if bit 3 is set in a bitfield, you can do:
 * ```ts
 * const bitToCheck = bitfieldBit(3); // 8
 * if (bitfield & bitToCheck) {
 *   // Bit 3 is set
 * }
 * ```
 */
export function bitfieldBit(n: number): number {
  return 1 << n;
}
