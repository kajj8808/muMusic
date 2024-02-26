import { ApplicationCommandOptionType, REST, Routes } from "discord.js";
// import playCommnad from "./commands/play";

export interface ICommand {
  name: string;
  description: string;
  options?: [
    {
      name: string;
      description: string;
      type: ApplicationCommandOptionType;
      required: boolean;
    }
  ];
}

const commands: ICommand[] = [];

export async function registerCommand() {
  const rest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_BOT_TOKEN ?? ""
  );
  try {
    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID ?? ""),
      { body: commands }
    );
  } catch (e) {
    console.log(e);
  }
}

// registerCommand();
