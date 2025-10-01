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

## API reference (backend)


### POST /init_project
Initialise the project (probably gonna be called from the discord bot). Users correspond to discord usernames.
```json
{
  "users": ["alice", "bob", "charlie"]
}

```
Return nothing.

### POST /create_task
Create a task with title, deadline, and a list of usernames assigned to this task (discord usernames)
```json
{
  "title": "Finish report",
  "deadline": "2025-10-15",
  "usernames": ["alice", "bob"]
}
```

Returns the task id:
```json
{
  "id": "uuid-string"
}
```


### GET /get_users
```json
Get all users in the server
{
  "users": ["alice", "bob", "charlie"]
}
```

### GET /user/<username>/task_list

Get tasks for a specific user.
```
json
{
  "tasks": [
    {
      "id": "uuid-string",
      "title": "Finish report",
      "deadline": "2025-10-15",
      "usernames": ["alice", "bob"],
      "status": "NOT_STARTED"
    }
  ]
}
```

### GET /get_upcoming_tasks
(stub function)

```json
{
  "tasks": []
}
```

### GET /get_progress

Get progress of the project

```json
{
  "completed": 2,
  "in_progress": 1,
  "not_started": 3,
  "total": 6
}
```

### GET /get_current_tasks

Get all tasks that are in progress
```json
{
  "tasks": [
    {
      "id": "uuid-string",
      "title": "Group meeting",
      "deadline": "2025-10-02",
      "usernames": ["bob"],
      "status": "INPROGRESS"
    }
  ]
}
```
## Task Object Schema
This is what the task object looks internally.
```json
{
  "id": "uuid-string",
  "title": "string",
  "deadline": "string",
  "usernames": ["string"],
  "status": "NOT_STARTED" | "INPROGRESS" | "COMPLETE"
}
```