import { REST, Routes, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Load .env
let envPath = path.resolve("./.env");
if (!fs.existsSync(envPath)) {
  envPath = path.resolve("../.env");
}
dotenv.config({ path: envPath });

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// Validate
if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
  console.error("❌ Missing environment variables in .env");
  process.exit(1);
}

// Define commands
const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),

  new SlashCommandBuilder()
    .setName("newproject")
    .setDescription("Create a new project")
    .addStringOption(option => option.setName("name").setDescription("Project name").setRequired(true)),

  new SlashCommandBuilder()
    .setName("addtask")
    .setDescription("Add a task to a project")
    .addStringOption(option => option.setName("task").setDescription("Task name").setRequired(true))
    .addStringOption(option => option.setName("due").setDescription("Due date").setRequired(true))
].map(cmd => cmd.toJSON());

// Initialize REST client
const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

(async () => {
  try {
    console.log("🚀 Deploying commands...");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log("✅ Commands deployed successfully!");
  } catch (error) {
    console.error("❌ Error deploying commands:", error);
  }
})();
