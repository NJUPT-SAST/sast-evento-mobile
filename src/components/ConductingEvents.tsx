import EventCard from "./EventCard";
import { IonItem, IonLabel, IonIcon, IonList } from "@ionic/react";
import { paperPlaneOutline } from "ionicons/icons";
import { useEffect, useState } from "react";


import { Event } from "../context";
import { getAllConductingEvent } from "../apis/user";

import './ConductingEvent.scss'

const ConductingEvents: React.FC = () => {
  const [conductingEvent, setConductingEvent] = useState<Event[]>([]);

  useEffect(() => {
    getAllConductingEvent().then((res) => {
      console.log(res);
      setConductingEvent(res);
    });
  }, []);

  return (
    <div className="conductingEvents">
      <IonItem>
        <IonLabel className='eventsTitleWarpper'>
          <IonIcon icon={paperPlaneOutline}></IonIcon>
          进行中的活动
        </IonLabel>
      </IonItem>
      <IonList class='eventContainer'>
        {conductingEvent.map((item, index) => (
          <IonItem key={item.id}>
            <EventCard event={item} ></EventCard>
          </IonItem>
        ))}
      </IonList>
    </div>
  );
};

export default ConductingEvents;