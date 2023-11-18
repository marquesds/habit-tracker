interface HabitCardProps {
  name: string;
  unit: string;
  quantity: number;
  actual: number;
}

export default function HabitCard(card: HabitCardProps) {
  return (
    <div className="flex flex-col items-center mx-auto p-6 max-w-sm rounded-xl shadow-lg bg-orange-100 space-y-3">
      <div>{card.name}</div>
      <div className="flex flex-col items-center font-bold">
        <span>
          {card.actual} / {card.quantity}
        </span>
        <span>{card.unit}</span>
      </div>
      <div className="flex flex-row space-x-3">
        <button className="bg-gray-700 hover:bg-gray-600 text-white mx-0 border border-gray-600 rounded-sm shadow-sm flex items-center justify-center w-5 h-5">
          +
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white mx-0 border border-gray-600 rounded-sm shadow-sm flex items-center justify-center w-5 h-5">
          -
        </button>
      </div>
    </div>
  );
}
