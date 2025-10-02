import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!")) return;

  const [cmd, ...args] = message.content.slice(1).split(" ");

  if (cmd === "ping") {
    message.reply("Pong!");
  }

  if (cmd === "newproject") {
    const name = args.join(" ");
    message.channel.send(`Project created: **${name}**`);
  }

  if (cmd === "addtask") {
    const [task, due] = args;
    message.channel.send(`Task added: **${task}** due on ${due}`);
  }
});

client.login(process.env.DISCORD_TOKEN);
