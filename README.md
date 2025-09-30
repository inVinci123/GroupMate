# GroupMate
Discord Bot for assignment management (Devsoc Flagship Hacakthon 2025 T3)

## Project Outline
Project: GroupMate (Discord Bot + Web Dashboard)
### Core Concept
A Discord bot that helps student groups manage assignments by automating task setup, reminders, and progress tracking, with a web dashboard that visualises everything.

### Minimum Viable Features (2 days build)
Discord Bot Setup (Core)

`!newproject <name> → creates a project.`

`!addtask <task> <due-date> → adds tasks with deadlines.`

`!assign <task> <user> → assigns a user to a task.`

- Automatic reminders in Discord before deadlines.
- Web Dashboard (Simple but Effective)
- Displays current projects, tasks, who’s assigned, and progress % (basic task completion tracker).
- Shows deadlines in a timeline or list format.
- Hosted simply (Heroku/Netlify for frontend, Firebase/Supabase backend).
- Sync Between Bot + Dashboard
- Whenever the bot updates (new task, status change), it syncs to the database → dashboard auto-updates.

🔹 Optional “Nice-to-Have” (if time allows)
- End-of-day summary: bot posts a quick digest → “2 tasks done, 3 in progress, 1 overdue.”
- Google Calendar integration: deadlines auto-added.
- Progress roles: Bot assigns a Discord role like “On Track” or “Needs Reminder” based on task status.
- Auto assignment breakdown: Upload an assignment brief, and break it down into tasks to do/suggestions to add as tasks with deadlines.


## DIRECTORY STRUCTURE
- /bot - contains code for the discord bot
- /dashboard - contains react code for the dashboard
- /shared - shared bot data for now
