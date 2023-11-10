import { useEffect, useState } from "react";
import "./SubsrcibedEvents.scss"
import { getSubscribedEvents } from "../apis/user";
import EventCardList from "./EventCardList";
import { Event } from "../context";

const SubscribedEvents = () => {
  const [subcribeEvents, setSubcribeEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    getSubscribedEvents().then((res) => {
      setSubcribeEvents(res);
    }, () => {
      setSubcribeEvents([]);
    });
  }, [])
  return (
    <div className="subscribedEventsWarpper">
      <EventCardList events={subcribeEvents} lines="full" isShadow={true}></EventCardList>
    </div>
  )
}

export default SubscribedEvents;