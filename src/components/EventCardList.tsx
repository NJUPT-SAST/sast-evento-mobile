import { IonItem, IonList } from "@ionic/react";
import { Event } from "../context";
import EventCard from "./EventCard";

interface Props {
  events: Event[];
  lines?: "full" | "inset" | "none";
  isShadow?: true | false | undefined;
}

const EventCardList = ({ events, lines, isShadow }: Props) => {
  return (
    <IonList class='eventContainer'>
      {events.map((item, index) => (
        <IonItem key={item.id} lines={lines}>
          <EventCard event={item} isShadow={isShadow}></EventCard>
        </IonItem>
      ))}
    </IonList>
  );
};

export default EventCardList;
