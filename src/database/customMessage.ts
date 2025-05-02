import { APIContainerComponent } from "discord.js";

export interface ICustomMessage {
  guildId: string;
  name: string;
  containerData: APIContainerComponent;
}
