import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import { ICommand } from "../discord";

const button = new ButtonBuilder()
  .setLabel("button")
  .setCustomId("frist button")
  .setStyle(ButtonStyle.Primary);
export const row = new ActionRowBuilder().addComponents(button) as any;

const commnad: ICommand = {
  name: "play",
  description: "play [term]",
  options: [
    {
      name: "term",
      description: "검색어",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
};

export default commnad;
