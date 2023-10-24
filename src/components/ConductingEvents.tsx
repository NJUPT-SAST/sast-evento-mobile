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
      const event1 = {
        "id": 9,
        "title": "test2",
        "description": "软研联合授课",
        "gmtEventStart": "2023-10-01 14:30:31",
        "gmtEventEnd": "2023-10-03 10:31:31",
        "gmtRegistrationStart": "2023-10-01 10:31:58",
        "gmtRegistrationEnd": "2023-10-01 12:31:58",
        "eventType": {
          "id": 1,
          "typeName": "default",
          "allowConflict": true
        },
        "location": "仙林校区大学生活动中心汇客厅",
        "locationId": 5,
        "tag": "test",
        "state": "NOT_STARTED",
        "departments": [
          {
            "id": 3,
            "departmentName": "C++组"
          },
          {
            "id": 4,
            "departmentName": "前端组"
          },
          {
            "id": 5,
            "departmentName": "后端组"
          }
        ]
      };
      setConductingEvent([event1, ...res]);
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