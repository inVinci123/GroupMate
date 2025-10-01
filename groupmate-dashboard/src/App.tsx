import { useState } from 'react';
import './App.css';
import Tasks, { type Task } from './TasksPage'; // <-- Import Task type
import YourTasksCard, { type DashboardTask } from './YourTasksCard';
import AllTasksCard, { type AllTask } from './AllTasksCard';
import OverallProgressCard from './OverallProgressCard';

// Example data bcs idk how to use the json stuff

const progressData = {
  completed: 2,
  in_progress: 1,
  not_started: 3,
  total: 6,
};

const allTasks: AllTask[] = [
  {
    id: 'a1b2c3d4',
    title: 'Group meeting',
    deadline: '2025-10-02',
    usernames: ['bob', 'alice'],
    status: 'IN_PROGRESS',
  },
  {
    id: 'a1b6c3d4',
    title: 'Group meeting',
    deadline: '2025-10-02',
    usernames: ['bob', 'alice'],
    status: 'IN_PROGRESS',
  },
  {
    id: 'a1b2c3d4',
    title: 'Group meeting',
    deadline: '2025-10-02',
    usernames: ['bob', 'alice'],
    status: 'IN_PROGRESS',
  },
  {
    id: 'e5f6g7h8',
    title: 'Prepare slides',
    deadline: '2025-10-05',
    usernames: ['carol'],
    status: 'NOT_STARTED',
  },
  {
    id: 'i9j0k1l2',
    title: 'Submit report',
    deadline: '2025-10-10',
    usernames: ['dave', 'eve'],
    status: 'COMPLETED',
  },
  {
    id: 'm3n4o5p6',
    title: 'Review code',
    deadline: '2025-10-08',
    usernames: ['alice'],
    status: 'IN_PROGRESS',
  },
];

const dashboardTasks: DashboardTask[] = [
  {
    id: '1',
    title: 'Finish report',
    deadline: '2025-10-15',
    usernames: ['alice', 'bob'],
    status: 'NOT_STARTED',
  },
  {
    id: '4',
    title: 'Finish report',
    deadline: '2025-10-15',
    usernames: ['alice', 'bob'],
    status: 'NOT_STARTED',
  },
  {
    id: '2',
    title: 'Review PR',
    deadline: '2025-10-10',
    usernames: ['carol'],
    status: 'IN_PROGRESS',
  },
  {
    id: '3',
    title: 'Deploy update',
    deadline: '2025-10-05',
    usernames: ['dave'],
    status: 'COMPLETED',
  },
];

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Chart the Cosmic Winds',
    due: 'Oct 30, 2023',
    stage: 'in_progress',
  },
  {
    id: 2,
    title: 'Gather Stardust Samples',
    due: 'Nov 05, 2023',
    stage: 'not_started',
  },
  {
    id: 3,
    title: 'Map the Asteroid Belt',
    due: 'Oct 20, 2023',
    stage: 'completed',
  },
];

function App() {
  const [screen, setScreen] = useState<'dashboard' | 'tasks'>('dashboard');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    assignee: '',
    due: '',
  });

  const moveTask = (id: number, direction: 'forward' | 'back') => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id !== id) return task;
        if (direction === 'forward') {
          if (task.stage === 'not_started')
            return { ...task, stage: 'in_progress' };
          if (task.stage === 'in_progress')
            return { ...task, stage: 'completed' };
        } else {
          if (task.stage === 'completed')
            return { ...task, stage: 'in_progress' };
          if (task.stage === 'in_progress')
            return { ...task, stage: 'not_started' };
        }
        return task;
      })
    );
  };

  const handleCreateTask = () => {
    // Example: Add to tasks (customize as needed)
    if (newTask.title && newTask.assignee && newTask.due) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          title: newTask.title,
          due: newTask.due,
          stage: 'not_started',
        },
      ]);
      setShowModal(false);
      setNewTask({ title: '', assignee: '', due: '' });
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 to-blue-900 text-white flex overflow-hidden">
      <aside className="w-64 bg-black/30 p-4 flex flex-col justify-between backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              data-alt="Discord bot logo with a vibrant gradient background."
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCt18O42dSm8RizGaDDFkF_RLj_RzSE_UddwrBuW7AYwgG9OsjMW8Fnwo0xaupt6CWjWfG9tWCdjsvMrt4lrZv5ZUr9AI7WBjuurYLiQKViHoKYKLo6_eaYaCQNMICS07-DWs7pf5zbgywq3TQgPrLVRTidSOyA222kBz0pIohJv20qfJ-WTPY-HShDUYweh-3ENN6pDE3_Gb6zrJ0zefpK3QwT27qxY8VjXYThPfFUSTNdG-rr5Cx_hVZk433NMp6qVjRzot3p")',
              }}
            />
            <div>
              <h1 className="text-white text-base font-medium leading-normal">
                PeaceKeeper
              </h1>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <a
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-700/50"
              href="#"
              onClick={() => setScreen('dashboard')}
            >
              <span className="material-symbols-outlined text-purple-400">
                dashboard
              </span>
              <p className="text-white text-sm font-medium leading-normal">
                Dashboard
              </p>
            </a>
            <a
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-700/50"
              href="#"
              onClick={() => setScreen('tasks')}
            >
              <span className="material-symbols-outlined text-purple-400">
                checklist
              </span>
              <p className="text-white text-sm font-medium leading-normal">
                Tasks
              </p>
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            data-alt="User avatar with a playful accessory."
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAUWHZi1HnqBcCrDvjDVwI4XJdNhuvhkyP8nxPYzAaphl1qrebAB8kA3qnV7HZp6TYIKQdP1eviVs3Ps3fHeDG7k0YgX6BCiDPPBeCU_EItAuzcCv1F1jRFLQjzBLgb54aorD_DYMjiCmLhFyEJXgIqX75fMYWvtR7c9rzZwtUdS3mSGAuzz_Qal5_yz0qN0Nnj9LC6RSgQiShdNOG9a7FNExInONFd3K8SiBQ4UnYBU8xOJQYzyVNCohRpWEaslMiTX9KZq6Pi")',
            }}
          />
          <div>
            <p className="text-white text-sm font-medium">Jane Doe</p>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-8">
        {screen === 'tasks' ? (
          <Tasks tasks={tasks} moveTask={moveTask} />
        ) : (
          // Optionally, you can show the dashboard here or leave blank
          <div className="flex items-center justify-center h-full">
            <main className="flex-1 p-8">
              <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-purple-700/50 pb-4 mb-8">
                <div className="flex items-center gap-4 text-white">
                  <div className="size-6">
                    <svg
                      fill="none"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_6_330)">
                        <path
                          clipRule="evenodd"
                          d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                          fill="currentColor"
                          fillRule="evenodd"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_6_330">
                          <rect fill="white" height={48} width={48} />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">
                    Project: Nebula Quest
                  </h2>
                </div>
                <div className="flex items-center gap-8">
                  <button
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 shadow-lg"
                    onClick={() => setShowModal(true)}
                  >
                    <span className="material-symbols-outlined">add</span>
                    New Task
                  </button>
                </div>
              </header>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <YourTasksCard
                    tasks={dashboardTasks}
                    onCardClick={() => setScreen('tasks')}
                  />
                  <AllTasksCard
                    tasks={allTasks}
                    onCardClick={() => setScreen('tasks')}
                  />
                </div>
                <div className="space-y-8">
                  <OverallProgressCard progress={progressData} />
                </div>
              </div>
            </main>
          </div>
        )}
      </main>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-black/30 rounded-lg p-8 backdrop-blur-sm w-full max-w-md text-white">
            <h2 className="text-xl font-bold mb-4 text-pink-400">
              Create New Task
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-purple-300 mb-1">
                Task Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring bg-black/10 text-white"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-purple-300 mb-1">
                Assignees (comma separated)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring bg-black/10 text-white"
                value={newTask.assignee}
                onChange={(e) =>
                  setNewTask({ ...newTask, assignee: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-purple-300 mb-1">
                Due Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring bg-black/10 text-white"
                value={newTask.due}
                onChange={(e) =>
                  setNewTask({ ...newTask, due: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-purple-700/50 text-white font-semibold"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-pink-500 text-white font-semibold"
                onClick={() => {
                  if (newTask.title && newTask.assignee && newTask.due) {
                    setTasks([
                      ...tasks,
                      {
                        id: tasks.length + 1,
                        title: newTask.title,
                        due: newTask.due,
                        stage: 'not_started',
                      },
                    ]);
                    setShowModal(false);
                    setNewTask({ title: '', assignee: '', due: '' });
                  }
                }}
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
