import { useEffect, useState } from "react";
import { getRegisteredEvents } from "../apis/user";
import { Event } from "../context";
import EventCardList from "./EventCardList";

const RegisteredEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    getRegisteredEvents().then((res) => {
      setRegisteredEvents(res);
    }, () => {
      setRegisteredEvents([]);
    });
  }, []);

  return (
    <div>
      <EventCardList events={registeredEvents} lines="none" />
    </div>
  )
}

export default RegisteredEvents;