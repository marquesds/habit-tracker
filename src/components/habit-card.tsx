import React, { useState } from "react";
import axios from "axios";

interface HabitCardProps {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  achieved: number;
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
  const [achieved, setachieved] = useState(props.achieved);

  const updateAchievedValue = async (newAchievedValue: number) => {
    try {
      await axios.put(`/api/habits/${props.id}`, {
        achieved: newAchievedValue,
      });
      setachieved(newAchievedValue);
    } catch (error) {
      console.error("Error updating habit", error);
    }
  };

  const increaseachieved = () => {
    if (achieved < props.quantity) {
      updateAchievedValue(achieved + 1);
    }
  };

  const decreaseachieved = () => {
    if (achieved > 0) {
      updateAchievedValue(achieved - 1);
    }
  };

  return (
    <div
      id={props.id}
      className="flex flex-col items-center mx-auto my-5 p-6 max-w-sm rounded-xl shadow-lg bg-orange-100 space-y-3"
    >
      <div>{props.name}</div>
      <div className="flex items-center justify-center overflow-hidden rounded-full">
        <svg
          className="w-32 h-32 transform translate-x-1 translate-y-1"
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
          <Circle percent={(achieved / props.quantity) * 100} />
        </svg>
        <div className="absolute flex flex-col items-center font-bold">
          <span>
            {achieved} / {props.quantity}
          </span>
          <span>{props.unit}</span>
        </div>
      </div>
      <div className="flex flex-row space-x-3">
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white mx-0 border border-gray-600 rounded-sm shadow-sm flex items-center justify-center w-5 h-5"
          onClick={increaseachieved}
        >
          +
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white mx-0 border border-gray-600 rounded-sm shadow-sm flex items-center justify-center w-5 h-5"
          onClick={decreaseachieved}
        >
          -
        </button>
      </div>
    </div>
  );
}
