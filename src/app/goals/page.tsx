"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Goal from "@/components/goal";
import Menu from "@/components/menu";
import Head from "next/head";
import Welcome from "@/components/welcome";
import HabitProgressBar from "@/components/habit-progress-bar";
import WeekCalendar from "@/components/date";
import GoalForm from "@/components/goal-form";

interface Habit {
  id: number;
  name: string;
  unit: string;
  quantity: number;
  achieved: number;
}

export default function Goals() {
  const [habits, setHabits] = useState([]);
  const [complete, setComplete] = useState(0);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get("/api/habits");
        setHabits(response.data);
        setComplete(
          response.data.filter(
            (habit: Habit) => habit.quantity === habit.achieved,
          ).length,
        );
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };

    fetchHabits();
  }, []);

  return (
    <div className="flex flex-col">
      <Head>
        <title>Habit Tracker | Objetivos</title>
      </Head>
      <div>
        <Welcome name="João" />
      </div>
      <div>
        <HabitProgressBar total={habits.length} completed={complete} />
      </div>
      <div>
        <WeekCalendar />
      </div>
      <div className="flex flex-row items-center justify-center my-3">
        <h1 className="font-medium text-xl">Nova atividade</h1>
      </div>
      <div className="flex flex-col flex-wrap mx-auto my-3">
        <span className="text-sm">Atividades</span>
        <ul>
          {habits.map((habit: Habit) => (
            <Goal name={habit.name} />
          ))}
        </ul>
      </div>
      <div>
        <GoalForm />
      </div>
      <div>
        <Menu />
      </div>
    </div>
  );
}
