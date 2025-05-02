import { SMAPISectionComponent } from "../utils/helperTypes";

/**
 * Interface representing a custom message in the database.
 *
 * A result of this should be a container for a Discord message.
 *
 * ### Parse this to:
 * ```ts
 * {
 *   flags: 32768, // djs: MessageFlags.IsComponentsV2
 *   components: [
 *     {
 *       type: 17,
 *       components: sections,
 *       accent_color: accent_color,
 *       spoiler: spoiler,
 *     }
 *   ]
 * }
 * ```
 */
export interface ICustomMessage {
  guildId: string;
  /**
   * The name of the custom message.
   *
   * Is unique to the guild.
   */
  name: string;
  /**
   * The custom message content.
   */
  sections: SMAPISectionComponent[];
  /**
   * The accent color of the container.
   *
   * If not set or null, no color will be applied.
   */
  accent_color?: number | null;
  /**
   * Whether the container should be marked as a spoiler.
   */
  spoiler?: boolean;
}
