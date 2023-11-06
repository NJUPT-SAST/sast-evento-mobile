import { useEffect, useState } from "react";
import { getRegisteredEvents } from "../apis/user";
import { Event } from "../context";
import EventCardList from "./EventCardList";

const RegisteredEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    getRegisteredEvents().then((res) => {
      setRegisteredEvents(res);
    });
  }, []);

  return (
    <div>
      <EventCardList events={registeredEvents} />
    </div>
  )
}

export default RegisteredEvents;