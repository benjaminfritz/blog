import React from "react";
import { format } from "date-fns";
import { de } from "react-day-picker/locale";
import { DayPicker } from "react-day-picker";

function GermanLabels() {
  return (
    <DayPicker
      locale={de}
      labels={{
        labelDayButton: (date, { today, selected }) => {
          let label = format(date, "PPPP", { locale: de });
          if (today) label = `Heute, ${label}`;
          if (selected) label = `${label}, ausgewählt`;
          return label;
        },
        labelWeekNumber: (weekNumber) => `Woche ${weekNumber}`,
        labelNext: () => "Nächster Monat",
        labelPrevious: () => "Vorheriger Monat",
        labelMonthDropdown: () => "Monat auswählen",
        labelYearDropdown: () => "Jahr auswählen",
      }}
    />
  );
}