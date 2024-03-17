import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ButtonStyle,
  CacheType,
  ColorResolvable,
  EmbedBuilder,
  GuildMember,
  Interaction,
} from "discord.js";
import { ICommand } from "../discord";
import { player } from "../index";
import { searchYoutubeUrl } from "../youtube";
import { IMetaData } from "../types";
import { getProminentColorHexCode } from "../utiles";

const button = new ButtonBuilder()
  .setLabel("button")
  .setCustomId("frist button")
  .setStyle(ButtonStyle.Primary);
export const row = new ActionRowBuilder().addComponents(button) as any;

// message factory
export async function playMessageEmbedFactory(metadata: IMetaData) {
  const prominetHexCode = (await getProminentColorHexCode(
    metadata.thumbnail.url
  )) as ColorResolvable;

  const playEmbed = new EmbedBuilder()
    .setColor(prominetHexCode)
    .setTitle(metadata.title)
    .setURL(`https://www.youtube.com/watch?${metadata.id}`)
    .setImage(metadata.thumbnail.url)
    .addFields(
      { name: "time", value: metadata.durationFormatted, inline: true },
      { name: "uploaded at", value: metadata.uploadedAt, inline: true }
    )
    .setTimestamp()
    .setFooter({
      text: metadata.channel.name,
      iconURL: metadata.channel.icon.url,
    });
  return playEmbed;
}

export async function playHandler(interaction: Interaction<CacheType>) {
  if (!interaction.isCommand()) return;

  const voiceChannel = (interaction.member as GuildMember).voice.channel;

  if (voiceChannel) {
    const term =
      interaction.options.get("term")?.value?.toString() ?? "michizure";

    const message = await interaction.editReply({
      content: "search for youtube url ...",
      /* components: [row], */
    });

    const youtubeUrl = await searchYoutubeUrl(term);

    if (!youtubeUrl) {
      message.edit("Error: youtube url doesn't exist");
      return;
    }

    await player.play(voiceChannel, youtubeUrl, {
      nodeOptions: { metadata: { message } },
    });
  } else {
    interaction.editReply("First, you must be on a voice channel.");
  }
}

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
