import { IonItem, IonLabel, IonIcon, IonList } from "@ionic/react";
import { paperPlaneOutline } from "ionicons/icons";
import { useEffect, useState } from "react";


import { Event } from "../context";
import { getAllConductingEvent } from "../apis/user";

import './ConductingEvent.scss'
import EventCardList from "./EventCardList";

const ConductingEvents: React.FC = () => {
  const [conductingEvent, setConductingEvent] = useState<Event[] | null>(null);

  useEffect(() => {
    getAllConductingEvent().then((res) => {
      setConductingEvent(res);
    });
  }, []);

  if (conductingEvent?.length === 0) {
    return (
      <></>
    )
  }

  return (
    <div className="conductingEvents">
      <IonItem lines="full">
        <IonLabel className='eventsTitleWarpper'>
          <IonIcon icon={paperPlaneOutline}></IonIcon>
          进行中的活动
        </IonLabel>
      </IonItem>
      <EventCardList events={conductingEvent} lines="none"></EventCardList>
    </div>
  );
};

export default ConductingEvents;