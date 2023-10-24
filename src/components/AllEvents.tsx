import { IonItem, IonLabel, IonIcon, IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonToast } from "@ionic/react";
import { archiveOutline } from "ionicons/icons";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";

import { Event } from "../context";
import { getEventList } from "../apis/user";

import './AllEvents.scss'

const AllEvent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(10);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    console.log(total);
    console.log(page);
    const size = 10;

    if (total / size < page) {
      setIsEnded(true);
      return;
    }

    getEventList(page, size).then((response) => {
      const newEvents: Event[] = response.result;
      console.log(newEvents);
      setEvents([...events, ...newEvents])
      setTotal(response.total);
      setPage(page + 1);
    })
  };
  return (
    <div>
      <IonItem>
        <IonLabel className='eventsTitleWarpper'>
          <IonIcon icon={archiveOutline}></IonIcon>
          所有活动
        </IonLabel>
      </IonItem>
      <IonList class='eventContainer'>
        {events.map((item, index) => (
          <IonItem key={item.id}>
            <EventCard event={item} ></EventCard>
          </IonItem>
        ))}
      </IonList>
      <IonInfiniteScroll
        onIonInfinite={(ev) => {
          getItems();
          setTimeout(() => ev.target.complete(), 2000);
        }}
      >
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
      <IonToast
        isOpen={isEnded}
        onDidDismiss={() => setIsEnded(false)}
        message="到底了  qaq"
        duration={2000}
        color="medium"
      />
    </div>
  )
}

export default AllEvent;