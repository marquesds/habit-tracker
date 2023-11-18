import React, { useState } from "react";

interface HabitCardProps {
  name: string;
  unit: string;
  quantity: number;
  actual: number;
}

interface CircleProps {
  percent: number;
}

const Circle: React.FC<CircleProps> = ({ percent }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  return (
    <circle
      className="text-blue-600"
      strokeWidth="10"
      strokeDasharray={circumference}
      strokeDashoffset={circumference - (percent / 100) * circumference}
      strokeLinecap="round"
      stroke="currentColor"
      fill="transparent"
      r={radius}
      cx="60"
      cy="60"
    />
  );
};

export default function HabitCard(props: HabitCardProps) {
  const [actual, setActual] = useState(props.actual);

  const increaseActual = () => {
    if (actual < props.quantity) {
      setActual(actual + 1);
    }
  };

  const decreaseActual = () => {
    if (actual > 0) {
      setActual(actual - 1);
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto my-5 p-6 max-w-sm rounded-xl shadow-lg bg-orange-100 space-y-3">
      <div>{props.name}</div>
      <div className="flex items-center justify-center overflow-hidden rounded-full">
        <svg
          className="w-32 h-32 transform translate-x-1 translate-y-1"
          x-cloak
          aria-hidden="true"
        >
          <circle
            className="text-gray-300"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="50"
            cx="60"
            cy="60"
          />
          <Circle percent={(actual / props.quantity) * 100} />
        </svg>
        <div className="absolute flex flex-col items-center font-bold">
          <span>
            {actual} / {props.quantity}
          </span>
          <span>{props.unit}</span>
        </div>
      </div>
      <div className="flex flex-row space-x-3">
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white mx-0 border border-gray-600 rounded-sm shadow-sm flex items-center justify-center w-5 h-5"
          onClick={increaseActual}
        >
          +
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white mx-0 border border-gray-600 rounded-sm shadow-sm flex items-center justify-center w-5 h-5"
          onClick={decreaseActual}
        >
          -
        </button>
      </div>
    </div>
  );
}
