import { useEffect, useState } from "react";
import "./SubsrcibedEvents.scss"
import { getSubscribedEvents } from "../apis/user";
import EventCardList from "./EventCardList";
import { Event } from "../context";

const SubscribedEvents = () => {
  const [subcribeEvents, setSubcribeEvents] = useState<Event[]>([]);

  useEffect(() => {
    getSubscribedEvents().then((res) => {
      setSubcribeEvents(res);
    });
  }, [])
  return (
    <div className="subscribedEventsWarpper">
      <EventCardList events={subcribeEvents}></EventCardList>
    </div>
  )
}

export default SubscribedEvents;