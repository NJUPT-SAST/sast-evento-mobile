import { IonCard, IonItem, IonLabel, IonList, IonListHeader, IonNote } from "@ionic/react";
import { Event } from "../context";
import EventCard from "./EventCard";
import "./EventCardList.scss"

interface Props {
  events: Event[] | null;
  eventsTitle?: string | undefined;
  lines?: "full" | "inset" | "none";
  isShadow?: true | false | undefined;
}

const EventCardList = ({ events, eventsTitle, lines, isShadow }: Props) => {
  // if (events == null) {
  //   return (
  //     <IonList class='eventContainer'>
  //       {Array(3).fill({ id: null }).map((item, index) => (
  //         <IonItem key={index} lines={lines}>
  //           <EventCard event={item} isShadow={isShadow}></EventCard>
  //         </IonItem>
  //       ))}
  //     </IonList>
  //   )
  // }

  if (events == null || events.length === 0) {
    return (
      <div style={{ textAlign: "center", margin: "15px" }}>
        <IonNote>没有更多的活动了</IonNote>
      </div>
    )
  }

  return (
    <>
      <IonList className="eventCardListContainer">
        {eventsTitle !== undefined ?
          <IonListHeader mode="ios" style={{ "--color": "none" }}>
            <IonLabel>{eventsTitle}</IonLabel>
          </IonListHeader> :
          <></>
        }

        <div className='eventsContainer'>
          {events.map((item, index) => (
            <EventCard key={index} event={item} isShadow={isShadow}></EventCard>
          ))}
        </div>
      </IonList>
    </>
  );
};

export default EventCardList;
