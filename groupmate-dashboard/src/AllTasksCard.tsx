import React from 'react';

export type AllTaskStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface AllTask {
  id: string;
  title: string;
  deadline: string;
  usernames: string[];
  status: AllTaskStatus;
}

interface AllTasksCardProps {
  tasks: AllTask[];
  onCardClick?: () => void;
}

const statusStyles: Record<AllTaskStatus, string> = {
  NOT_STARTED: 'bg-gray-500 text-gray-200',
  IN_PROGRESS: 'bg-yellow-500 text-yellow-200',
  COMPLETED: 'bg-green-500 text-green-200',
};

const statusLabels: Record<AllTaskStatus, string> = {
  NOT_STARTED: 'Not Started',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

export default function AllTasksCard({
  tasks,
  onCardClick,
}: AllTasksCardProps) {
  return (
    <div
      className="bg-black/30 rounded-lg p-6 backdrop-blur-sm max-h-[35vh] flex flex-col cursor-pointer"
      onClick={() => {
        if (onCardClick) onCardClick();
      }}
    >
      <h3 className="text-lg font-bold mb-4 text-pink-400">All Tasks</h3>
      <div className="overflow-y-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-purple-700/50">
              <th className="p-3 text-sm font-medium text-purple-300">Task</th>
              <th className="p-3 text-sm font-medium text-purple-300">Users</th>
              <th className="p-3 text-sm font-medium text-purple-300">
                Deadline
              </th>
              <th className="p-3 text-sm font-medium text-purple-300">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-3 text-purple-300 text-sm text-center"
                >
                  No tasks
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-purple-700/50 hover:bg-purple-800/40"
                >
                  <td className="p-3 text-sm">{task.title}</td>
                  <td className="p-3">
                    <div className="flex -space-x-2">
                      {task.usernames.map((username) => (
                        <span
                          key={username}
                          className="inline-block bg-purple-700/50 rounded-full px-2 py-1 text-xs text-white font-medium"
                        >
                          {username}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-sm">{task.deadline}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full shadow-md ${
                        statusStyles[task.status]
                      }`}
                    >
                      {statusLabels[task.status]}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
