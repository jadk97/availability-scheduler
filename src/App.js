import React, { useState } from "react";
import EventCalendar from "./EventCalendar";
import startOfWeek from "date-fns/startOfWeek";
import availability from "./availability.json";
import { getNearestDateTime } from "./getNearestDateTime";
function App() {
  console.log("raw dummy API data", availability);


  const objectToArray = (obj) => {
    let result = [];
    for (const key in obj) {
      result.push(...obj[key]);
    }
    return result;
  };


  const flattenedAvailability = objectToArray(availability).map((entry) => ({
    day: entry.day,
    id: entry.id,
    start: getNearestDateTime(entry.day, entry.start),
    end: getNearestDateTime(entry.day, entry.end),
  }));

  console.log("API data converted", flattenedAvailability);

  return (
    <div>
      <EventCalendar events={flattenedAvailability} />
    </div>
  );
}
export default App;
