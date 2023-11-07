import { IonItem, IonList } from "@ionic/react";
import { Event } from "../context";
import EventCard from "./EventCard";

interface Props {
  events: Event[];
}

const EventCardList = ({ events }: Props) => {
  return (
    <IonList class='eventContainer'>
      {events.map((item, index) => (
        <IonItem key={item.id}>
          <EventCard event={item} ></EventCard>
        </IonItem>
      ))}
    </IonList>
  );
};

export default EventCardList;
