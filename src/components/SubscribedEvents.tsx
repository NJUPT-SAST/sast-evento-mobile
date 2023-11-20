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
      <EventCardList eventsTitle="我订阅的活动" events={subcribeEvents} lines="none" isShadow={false}></EventCardList>
    </div>
  )
}

export default SubscribedEvents;