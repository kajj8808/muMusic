import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ButtonStyle,
  CacheType,
  GuildMember,
  Interaction,
} from "discord.js";
import { ICommand } from "../discord";
import { player } from "../index";
import { searchYoutubeUrl } from "../youtube";

const button = new ButtonBuilder()
  .setLabel("button")
  .setCustomId("frist button")
  .setStyle(ButtonStyle.Primary);
export const row = new ActionRowBuilder().addComponents(button) as any;

// message factory
function messageEmbed() {
  return "";
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
