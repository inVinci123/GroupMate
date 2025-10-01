import React from 'react';

interface ProgressData {
  completed: number;
  in_progress: number;
  not_started: number;
  total: number;
}

interface OverallProgressCardProps {
  progress: ProgressData;
}

export default function OverallProgressCard({
  progress,
}: OverallProgressCardProps) {
  const percent =
    progress.total === 0
      ? 0
      : Math.round((progress.completed / progress.total) * 100);

  return (
    <div className="bg-black/30 rounded-lg p-6 backdrop-blur-sm">
      <h3 className="text-lg font-bold mb-4 text-pink-400">Overall Progress</h3>
      <div className="flex items-center justify-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              className="text-purple-700/50"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              strokeWidth={3}
              stroke="currentColor"
            />
            <path
              className="text-pink-500"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              strokeDasharray={`${percent}, 100`}
              strokeLinecap="round"
              strokeWidth={3}
              stroke="currentColor"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-pink-400">{percent}%</span>
            <span className="text-sm text-purple-300">Complete</span>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-purple-300">
          {progress.completed}/{progress.total} tasks completed
        </p>
        <p className="text-xs text-purple-300 mt-2">
          {progress.in_progress} in progress, {progress.not_started} not started
        </p>
      </div>
    </div>
  );
}
