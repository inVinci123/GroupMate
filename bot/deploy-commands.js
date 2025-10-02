import { REST, Routes, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  new SlashCommandBuilder()
    .setName("newproject")
    .setDescription("Create a new project")
    .addStringOption(option => 
      option.setName("name").setDescription("Project name").setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("addtask")
    .setDescription("Add a task to a project")
    .addStringOption(option =>
      option.setName("task").setDescription("Task name").setRequired(true)
    )
    .addStringOption(option =>
      option.setName("due").setDescription("Due date").setRequired(true)
    )
]
.map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

const CLIENT_ID = 1422842708279693422;
const GUILD_ID = 1422845854091579454;

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
