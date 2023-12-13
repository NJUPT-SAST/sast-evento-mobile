import { useEffect, useState } from "react";

import { Event } from "../context";
import { getNewestEvents } from "../apis/user";
import EventCardList from "./EventCardList";

const NewestEvents = () => {
  const [newestEvents, setNewestEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    getNewestEvents().then((res) => {
      setNewestEvents(res);
    });
  }, [])

  if (newestEvents?.length === 0) {
    return (
      <></>
    )
  }

  return (
    <div>
      <EventCardList eventsTitle="最新活动" events={newestEvents} lines="none"></EventCardList>
    </div>
  )
}

export default NewestEvents;