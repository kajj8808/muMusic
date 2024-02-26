import "dotenv/config";
import { Client, Message } from "discord.js";
import { playHandler, row } from "./commands/play";

import "./discord";
import { Player } from "discord-player";

const client = new Client({
  intents: ["Guilds", "GuildVoiceStates", "GuildMessages"],
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    await interaction.deferReply();

    switch (interaction.commandName) {
      case "play":
        playHandler(interaction);
        break;
    }
  }
  if (interaction.isButton()) {
    console.log(interaction.customId);
  }
});

client.on("ready", async () => {
  console.log(`${client.user?.username} is online.`);
  await player.extractors.loadDefault();
});

// discord player part
export const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 26,
  },
});

player.events.on("playerStart", (queue, track) => {
  const message = queue.metadata.message as Message<boolean>;
  message.edit(`plaing ${track.title}🎶`);
});

player.events.on("audioTrackAdd", (queue, track) => {
  const message = queue.metadata.message as Message<boolean>;
  message.edit(`added for ${track.title}😗`);
});

player.events.on("error", (queue, error) => {
  const message = queue.metadata.message as Message<boolean>;
  message.edit(`discord player error : ${error.message}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
