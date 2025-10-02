import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// Bot ready
client.once("clientReady", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Optional: text command
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content === "!ping") message.reply("Pong!");
});

// Slash commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  }

  if (commandName === "newproject") {
    const name = interaction.options.getString("name");
    await interaction.reply(`Project created: **${name}**`);
  }

  if (commandName === "addtask") {
    const task = interaction.options.getString("task");
    const due = interaction.options.getString("due");
    await interaction.reply(`Task added: **${task}**, due on ${due}`);
  }
});

client.login(process.env.DISCORD_TOKEN);
