import addDays from "date-fns/addDays";
import startOfWeek from "date-fns/startOfWeek";
import addHours from "date-fns/addHours";
import add from "date-fns/add";

export const getNearestDateTime = (dayOfWeek, time) => {
  // time MUST be 24 hour format
  // week MUST start with Monday
  // time slot intervals MUST be hourly
  const dayOfWeekMap = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };

  // const nearestDay = addDays(
  //   startOfWeek(new Date(), { weekStartsOn: 1 }),
  //   dayOfWeekMap[dayOfWeek]
  // );

  const parsedHour = time.split(":")[0];

  return add(startOfWeek(new Date(), { weekStartsOn: 1 }), {
    days: dayOfWeekMap[dayOfWeek],
    hours: parsedHour,
  });
};
