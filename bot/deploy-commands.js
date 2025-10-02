import { REST, Routes, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Try loading .env from current folder or parent folder
let envPath = path.resolve("./.env");
if (!fs.existsSync(envPath)) {
  envPath = path.resolve("../.env"); // adjust if .env is in the root
}
dotenv.config({ path: envPath });

// Read environment variables
const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// Validate environment variables
if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
  console.error("Missing required environment variables in .env file!");
  console.error("Make sure DISCORD_TOKEN, CLIENT_ID, and GUILD_ID are set.");
  process.exit(1);
}

console.log("Environment variables loaded:");
console.log("CLIENT_ID:", CLIENT_ID);
console.log("GUILD_ID:", GUILD_ID);
console.log("DISCORD_TOKEN first 5 chars:", DISCORD_TOKEN.slice(0, 5));

// Define slash commands
const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),

  new SlashCommandBuilder()
    .setName("newproject")
    .setDescription("Create a new project")
    .addStringOption(option =>
      option.setName("name")
        .setDescription("Project name")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("addtask")
    .setDescription("Add a task to a project")
    .addStringOption(option =>
      option.setName("task")
        .setDescription("Task name")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("due")
        .setDescription("Due date")
        .setRequired(true)
    )
].map(cmd => cmd.toJSON());

// Initialize REST client
const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

// Deploy commands
(async () => {
  try {
    console.log("Deploying commands...");

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log("Commands deployed successfully!");
  } catch (error) {
    console.error("Error deploying commands:", error);
  }
})();
