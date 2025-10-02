
import { REST, Routes, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
  console.error("Missing environment variables");
  process.exit(1);
}

const commands = [
  new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),

  new SlashCommandBuilder()
    .setName("newproject")
    .setDescription("Create a new project")
    .addStringOption(option => option.setName("name").setDescription("Project name").setRequired(true)),

  new SlashCommandBuilder()
    .setName("addtask")
    .setDescription("Add a task to a project")
    .addStringOption(option => option.setName("project").setDescription("Project name").setRequired(true))
    .addStringOption(option => option.setName("task").setDescription("Task name").setRequired(true))
    .addStringOption(option => option.setName("due").setDescription("Due date").setRequired(true)),

  new SlashCommandBuilder()
    .setName("listprojects")
    .setDescription("List all projects and tasks")
].map(cmd => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

(async () => {
  try {
    console.log("Deploying commands...");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log("Commands deployed successfully!");
  } catch (error) {
    console.error("Error deploying commands:", error);
  }
})();
