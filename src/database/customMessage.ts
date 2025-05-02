import { TopLevelMessageComponent } from "../utils/helperTypes";

/**
 * Interface representing a custom message in the database.
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
   * All components used in the message.
   *
   * @see {@link https://discord.com/developers/docs/components/reference#anatomy-of-a-component}
   *
   * It's way too cimplicated to use the original type, so it's just an object here.
   */
  components: TopLevelMessageComponent[];
}
