import HabitCard from "@/components/habit-card";
import Image from "next/image";

export default function Home() {
  return <HabitCard name="Beber água" unit="copos" quantity={5} actual={3} />;
}
