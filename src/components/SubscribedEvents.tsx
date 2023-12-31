import { useEffect, useState } from "react";
import "./SubsrcibedEvents.scss"
import { getSubscribedEvents } from "../apis/user";
import EventCardList from "./EventCardList";
import { Event } from "../context";
import { useRefreshStore } from "../util/refresh";

const SubscribedEvents = () => {
  const [subcribeEvents, setSubcribeEvents] = useState<Event[] | null>(null);
  const refreshStore = useRefreshStore();
  useEffect(() => {
    getSubscribedEvents().then((res) => {
      refreshStore.setIsSubscribedEventsRefresh(false);
      setSubcribeEvents(res);
    }, () => {
      setSubcribeEvents([]);
    });
  }, [refreshStore.isSubscribedEventsRefresh])
  return (
    <div className="subscribedEventsWarpper">
      <EventCardList eventsTitle="我订阅的活动" events={subcribeEvents} lines="none" isShadow={false}></EventCardList>
    </div>
  )
}

export default SubscribedEvents;