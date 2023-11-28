import { useEffect, useState } from "react";
import { getRegisteredEvents } from "../apis/user";
import { Event } from "../context";
import EventCardList from "./EventCardList";
import { useRefreshStore } from "../util/refresh";

const RegisteredEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState<Event[] | null>(null);
  const refreshStore = useRefreshStore();
  
  useEffect(() => {
    getRegisteredEvents().then((res) => {
      refreshStore.setIsRegisteredEventsRefresh(false);
      setRegisteredEvents(res);
    }, () => {
      setRegisteredEvents([]);
    });
  }, [refreshStore.isRegisteredEventsRefresh]);

  return (
    <div>
      <EventCardList events={registeredEvents} lines="none" />
    </div>
  )
}

export default RegisteredEvents;