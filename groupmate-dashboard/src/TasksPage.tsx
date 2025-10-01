import React from 'react';

export type TaskStage = 'not_started' | 'in_progress' | 'completed';

export interface Task {
  id: number;
  title: string;
  due: string;
  stage: TaskStage;
}

interface TasksProps {
  tasks: Task[];
  moveTask: (id: number, direction: 'forward' | 'back') => void;
}

const stages: { key: TaskStage; label: string; color: string }[] = [
  {
    key: 'not_started',
    label: 'Not Started',
    color: 'bg-gray-500 text-gray-200',
  },
  {
    key: 'in_progress',
    label: 'In Progress',
    color: 'bg-yellow-500 text-yellow-200',
  },
  {
    key: 'completed',
    label: 'Completed',
    color: 'bg-green-500 text-green-200',
  },
];

export default function Tasks({ tasks, moveTask }: TasksProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-pink-400">Tasks Board</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stages.map((stage) => (
          <div
            key={stage.key}
            className="bg-black/30 rounded-lg p-6 backdrop-blur-sm min-h-[300px]"
          >
            <h3
              className={`text-lg font-bold mb-4 ${stage.color.replace(
                'bg-',
                'text-'
              )}`}
            >
              {stage.label}
            </h3>
            <div className="space-y-4">
              {tasks.filter((t) => t.stage === stage.key).length === 0 && (
                <div className="text-purple-300 text-sm">No tasks</div>
              )}
              {tasks
                .filter((t) => t.stage === stage.key)
                .map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-4 rounded-lg bg-purple-800/40 ${
                      task.stage === 'completed' ? 'opacity-60' : ''
                    }`}
                  >
                    <div>
                      <p
                        className={`font-medium ${
                          task.stage === 'completed' ? 'line-through' : ''
                        }`}
                      >
                        {task.title}
                      </p>
                      <p className="text-sm text-purple-300">
                        {task.stage === 'completed' ? 'Completed' : 'Due'}:{' '}
                        {task.due}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {task.stage !== 'not_started' && (
                        <button
                          className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-700/50 text-white shadow transition hover:bg-purple-700"
                          onClick={() => moveTask(task.id, 'back')}
                        >
                          ←
                        </button>
                      )}
                      {task.stage !== 'completed' && (
                        <button
                          className="px-2 py-1 text-xs font-semibold rounded-full bg-pink-500 text-white shadow transition hover:bg-pink-600"
                          onClick={() => moveTask(task.id, 'forward')}
                        >
                          →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
