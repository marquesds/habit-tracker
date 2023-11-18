"use client";

import HabitCard from "@/components/habit-card";
import HabitProgressBar from "@/components/habit-progress-bar";
import Menu from "@/components/menu";
import Welcome from "@/components/welcome";
import Head from "next/head";

export default function Goals() {
  return (
    <div className="flex flex-col">
      <Head>
        <title>Habit Tracker | Objetivos</title>
      </Head>
      <div>
        <Welcome name="João" />
      </div>
      <div>
        <HabitProgressBar total={3} completed={1} />
      </div>
      <div className="flex flex-row flex-wrap items-center">
        <HabitCard name="Beber água" unit="copos" quantity={5} actual={0} />
        <HabitCard name="Horas de sono" unit="horas" quantity={8} actual={0} />
        <HabitCard name="Leitura" unit="minutos" quantity={25} actual={0} />
      </div>
      <div>
        <Menu />
      </div>
    </div>
  );
}