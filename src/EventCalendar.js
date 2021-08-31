import PropTypes from "prop-types";
import add from "date-fns/add";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import areIntervalsOverlapping from "date-fns/areIntervalsOverlapping";
import isEqual from "date-fns/isEqual";
import getHours from "date-fns/getHours";
import getMonth from "date-fns/getMonth";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";

import Toolbar from "./Toolbar";
import { groupByKey } from "./groupByKey";

const EventCalendar = (props) => {
  const calendarStyles = makeStyles({
    slot: {
      fontFamily: '"Source Sans Pro", sans-serif',
      fontSize: 13,
      lineHeight: 1.55,
      textAlign: "left",
    },
    button: {
      backgroundColor: "#eaf6ff",
    },
    calendarWrapper: {
      "& .rbc-allday-cell": {
        display: "none",
      },
      "& .rbc-time-view .rbc-header": {
        borderBottom: "none",
      },
    },
  });

  const calendarClasses = calendarStyles();

  const [eventsArray, setEventsArray] = useState(props.events);
  const [eventIndex, setEventIndex] = useState(
    eventsArray.length > 0 ? eventsArray.length + 1 : 0
  );

  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
  });

  const handleEventClick = (event) => {
    // remove occupied slot on click
    const filteredEvents = eventsArray.filter(
      (eventToFilter) => eventToFilter.id !== event.id
    );
    setEventsArray(filteredEvents);
  };

  const handleSelect = ({ start, end }) => {
    // no overlapping or adjacent slots allowed
    const eventAlreadyExists = eventsArray.some(
      (event) =>
        areIntervalsOverlapping(
          { start: event.start, end: event.end },
          { start, end }
        ) ||
        isEqual(event.end, start) ||
        isEqual(event.start, end)
    );

    if (!eventAlreadyExists) {
      setEventsArray([
        ...eventsArray,
        {
          id: eventIndex,
          start,
          day: format(start, "iii"),
          end,
        },
      ]);
      setEventIndex(eventIndex + 1);
    }
  };

  const generateAvailabilitySchedule = () => {
    const convertDatesToTime = eventsArray.map((event) => ({
      day: event.day,
      start: format(event.start, "HH:mm"),
      end: format(event.end, "HH:mm"),
    }));

    const groupByDay = groupByKey(convertDatesToTime, "day", {
      omitKey: false,
    });

    console.log("generated schedule", groupByDay);
  };

  return (
    <>
      <Grid item className={calendarClasses.calendarWrapper}>
        <Calendar
          selectable
          localizer={localizer}
          // components={components}
          components={{ toolbar: Toolbar }}
          defaultView={Views.WEEK}
          events={eventsArray}
          formats={{
            dayFormat: "iii",
          }}
          startAccessor="start"
          endAccessor="end"
          views={["week"]}
          timeslots={1}
          step={60}
          min={add(startOfWeek(new Date(), { weekStartsOn: 1 }), { hours: 9 })}
          max={add(startOfWeek(new Date(), { weekStartsOn: 1 }), { hours: 18 })}
          onSelectEvent={(event) => handleEventClick(event)}
          onSelectSlot={handleSelect}
          style={{ height: 500, width: "100%" }}
        />
      </Grid>

      <Grid item>
        <Button
          className={calendarClasses.button}
          onClick={generateAvailabilitySchedule}
        >
          Generate schedule
        </Button>
      </Grid>
    </>
  );
};

export default EventCalendar;
