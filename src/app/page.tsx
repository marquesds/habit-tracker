"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import WeekCalendar from "@/components/date";
import HabitCard from "@/components/habit-card";
import HabitProgressBar from "@/components/habit-progress-bar";
import Menu from "@/components/menu";
import Welcome from "@/components/welcome";
import Head from "next/head";

interface Habit {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  achieved: number;
}

export default function Home() {
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
        <title>Habit Tracker | Home</title>
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
      <div className="flex flex-row flex-wrap items-center">
        {habits.map((habit: Habit) => (
          <HabitCard
            id={habit.id}
            name={habit.name}
            unit={habit.unit}
            quantity={habit.quantity}
            achieved={habit.achieved}
          />
        ))}
      </div>
      <div>
        <Menu />
      </div>
    </div>
  );
}
