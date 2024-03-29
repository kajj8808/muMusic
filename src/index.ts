import "dotenv/config";
import { Client, Message } from "discord.js";
import { playHandler, playMessageEmbedFactory, row } from "./commands/play";

import "./discord";
import { Player } from "discord-player";
import { sleep } from "./utiles";
import { IMetaData } from "./types";

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
    highWaterMark: 1 << 27,
  },
});

player.events.on("playerStart", async (queue, track) => {
  const message = queue.metadata.message as Message<boolean>;
  const metadata = track.metadata as IMetaData;
  const messageEmbeds = await playMessageEmbedFactory(metadata);

  message.edit({ embeds: [messageEmbeds] });
});

player.events.on("audioTrackAdd", async (queue, track) => {
  const message = queue.metadata.message as Message<boolean>;
  const addedMessage = message.channel.send(`added for ${track.title}😗`);
  await sleep(10);
  (await addedMessage).delete();
});

player.events.on("error", (queue, error) => {
  const message = queue.metadata.message as Message<boolean>;
  message.edit(`discord player error : ${error.message}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
