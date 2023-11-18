import React from "react";
import { format, add, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";

const WeekCalendar: React.FC = () => {
  // Inicia a partir de hoje
  const today = new Date();

  // Cria um array para os próximos 6 dias
  const daysOfWeek = Array.from({ length: 7 }, (_, index) =>
    add(today, { days: index }),
  );

  return (
    <div className="flex flex-row items-center justify-center p-3 my-auto mx-auto flex-wrap">
      {daysOfWeek.map((day) => {
        const isCurrentDay = isToday(day);
        return (
          <div
            className={`flex flex-col items-center mx-2 my-2 p-4 border ${
              isCurrentDay ? "border-orange-600" : "border-gray-300"
            }`}
            key={day.toString()}
            style={{ borderWidth: isCurrentDay ? "2px" : "1px" }}
          >
            <div
              className={`text-xs ${
                isCurrentDay ? "text-orange-600" : "text-gray-800"
              }`}
            >
              {isCurrentDay ? "Hoje" : format(day, "EEE", { locale: ptBR })}
            </div>
            <div
              className={`${
                isCurrentDay ? "text-orange-600" : "text-gray-800"
              }`}
            >
              {format(day, "dd/MM", { locale: ptBR })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeekCalendar;
