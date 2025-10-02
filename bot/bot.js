import { 
  Client, 
  GatewayIntentBits, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle 
} from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ],
});

// In-memory storage for projects and tasks
const projects = {};

// Correct ready event
client.once("cilentReady", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Handle slash commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  // /ping
  if (commandName === "ping") {
    await interaction.reply("Pong!");
  }

  // /newproject
  if (commandName === "newproject") {
    const name = interaction.options.getString("name");
    if (projects[name]) {
      return interaction.reply({ content: `Project "${name}" already exists!`, ephemeral: true });
    }
    projects[name] = [];
    await interaction.reply(`Project created: **${name}**`);
  }

  // /addtask
  if (commandName === "addtask") {
    const project = interaction.options.getString("project");
    const task = interaction.options.getString("task");
    const due = interaction.options.getString("due");

    if (!projects[project]) {
      return interaction.reply({ content: `Project "${project}" does not exist!`, ephemeral: true });
    }

    projects[project].push({ task, due, status: "Not Started" });
    await interaction.reply(`Task "${task}" added to project "${project}", due ${due}`);
  }

  // /listprojects
  if (commandName === "listprojects") {
    if (Object.keys(projects).length === 0) {
      return interaction.reply("No projects found.");
    }

    let message = "Projects and Tasks:\n";
    for (const [proj, tasks] of Object.entries(projects)) {
      message += `\n${proj}\n`;
      if (tasks.length === 0) {
        message += " No tasks yet\n";
      } else {
        tasks.forEach((t, i) => {
          message += `  ${i + 1}. ${t.task} - ${t.due} [${t.status}]\n`;
        });
      }
    }

    await interaction.reply(message);
  }

  // /updatetask
  if (commandName === "updatetask") {
    const project = interaction.options.getString("project");
    const taskIndex = interaction.options.getInteger("index") - 1;
    const status = interaction.options.getString("status");

    if (!projects[project]) {
      return interaction.reply({ content: `Project "${project}" does not exist!`, ephemeral: true });
    }
    if (!projects[project][taskIndex]) {
      return interaction.reply({ content: `Task #${taskIndex + 1} does not exist in project "${project}"!`, ephemeral: true });
    }

    projects[project][taskIndex].status = status;
    await interaction.reply(`Task #${taskIndex + 1} in project "${project}" updated to **${status}**`);
  }

  // /dashboard
  if (commandName === "dashboard") {
    const button = new ButtonBuilder()
      .setLabel("Open Dashboard")
      .setStyle(ButtonStyle.Link)
      .setURL("https://your-dashboard-url.com");

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({
      content: "Click the button below to open your dashboard:",
      components: [row],
      ephemeral: true
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
