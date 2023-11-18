interface HabitProgressBarProps {
  completed: number;
  total: number;
}

export default function HabitProgressBar(progress: HabitProgressBarProps) {
  const percentage = (progress.completed / progress.total) * 100;

  return (
    <div className="flex flex-col items-center justify-center mx-12 my-5">
      <h2 className="text-l">
        Você completou {progress.completed}/{progress.total} dos objetivos do
        dia!
      </h2>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
        <div
          className="bg-orange-600 h-2.5 rounded-full"
          style={{ width: percentage + "%" }}
        ></div>
      </div>
    </div>
  );
}
