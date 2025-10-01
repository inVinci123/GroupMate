import React, { useState } from 'react';
export type TaskStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface DashboardTask {
  id: string;
  title: string;
  deadline: string;
  usernames: string[];
  status: TaskStatus;
}

interface YourTasksCardProps {
  tasks: DashboardTask[];
  onStatusChange?: (id: string, newStatus: TaskStatus) => void;
  onCardClick?: () => void;
}

const statusStyles: Record<TaskStatus, string> = {
  NOT_STARTED: 'bg-gray-500 text-gray-200',
  IN_PROGRESS: 'bg-yellow-500 text-yellow-200',
  COMPLETED: 'bg-green-500 text-green-200',
};

const statusLabels: Record<TaskStatus, string> = {
  NOT_STARTED: 'Not Started',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

export default function YourTasksCard({
  tasks,
  onStatusChange,
  onCardClick,
}: YourTasksCardProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div
      className="bg-black/30 rounded-lg p-6 backdrop-blur-sm max-h-[35vh] flex flex-col cursor-pointer"
      onClick={() => {
        if (onCardClick) onCardClick();
      }}
    >
      <h3 className="text-lg font-bold mb-4 text-pink-400">
        Your Tasks ({tasks.length})
      </h3>
      <div className="space-y-2 overflow-y-auto">
        {tasks.length === 0 && (
          <div className="text-purple-300 text-sm">No tasks</div>
        )}
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between px-2 py-1 rounded bg-purple-800/40 ${
              task.status === 'COMPLETED' ? 'opacity-60' : ''
            }`}
            style={{ minHeight: '2.5rem' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 w-full">
              <span
                className={`font-medium text-sm ${
                  task.status === 'COMPLETED' ? 'line-through' : ''
                }`}
              >
                {task.title}
              </span>
              <span className="text-xs text-purple-300 sm:ml-2">
                {task.status === 'COMPLETED' ? 'Completed' : 'Due'}:{' '}
                {task.deadline}
              </span>
              <span className="text-xs text-purple-300 sm:ml-2">
                Assigned: {task.usernames.join(', ')}
              </span>
            </div>
            <div className="relative ml-2 flex-shrink-0">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full shadow-md cursor-pointer ${
                  statusStyles[task.status]
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(openMenuId === task.id ? null : task.id);
                }}
                tabIndex={0}
              >
                {statusLabels[task.status]}
              </span>
              {openMenuId === task.id && (
                <div
                  className="absolute right-0 mt-2 w-32 bg-black/80 rounded shadow-lg z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  {(
                    ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'] as TaskStatus[]
                  ).map((status) => (
                    <button
                      key={status}
                      className={`block w-full text-left px-4 py-2 text-xs hover:bg-purple-700/50 ${
                        status === task.status
                          ? 'font-bold text-pink-400'
                          : 'text-white'
                      }`}
                      onClick={() => {
                        setOpenMenuId(null);
                        if (onStatusChange) onStatusChange(task.id, status);
                      }}
                    >
                      {statusLabels[status]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
