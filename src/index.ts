import "dotenv/config";
import { Client, IntentsBitField } from "discord.js";
import { sleep } from "./utiles";

import { row } from "./commands/play";

import "./discord";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    await interaction.deferReply();
    await sleep(2);
    const message = await interaction.editReply({
      content: "message",
      components: [row],
    });
    console.log(message);
    message.edit({ content: "edit message", components: [row] });
  }
  if (interaction.isButton()) {
  }
});

client.on("ready", () => {
  console.log(`${client.user?.username} is online.`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
