import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IonContent, IonPage, IonToolbar, IonButton, IonFooter, IonIcon, IonList, IonItem, IonHeader } from '@ionic/react';
import { Event } from '../context';
import { getEventInfo } from '../apis/user';
import { chevronBack, folderOpenOutline, peopleOutline, pricetagsOutline } from 'ionicons/icons';
import './Event.scss';


const EventPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const history = useHistory();

  useEffect(() => {
    getEventInfo(Number(eventId)).then(res => {
      console.log(res);
      setEvent(res);
    });
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  const close = () => {
    history.goBack();
  }

  return (
    <IonPage>
      <IonHeader>
        <div className='backBar'>
          <IonIcon icon={chevronBack} size='large' onClick={close}></IonIcon>
        </div>
      </IonHeader>
      <IonContent fullscreen={true} className='eventBox'>
        <div className='titleBox'>
          <h1>{event.title}</h1>
          <IonButton fill="outline" size="small" disabled={event.state !== "NOT_STARTED" && event.state !== "CHECKING_IN"}>订阅</IonButton>
        </div>
        <div className='departmentBox'>
          <IonIcon icon={peopleOutline}></IonIcon>
          <div className='deparments'>
            {event.departments.map((department) => (
              <p key={department.id}>
                {department.departmentName}
              </p>
            ))}
          </div>
        </div>
        <div className='categryBox'>
          <div className='typeBox'>
            <IonIcon icon={folderOpenOutline}></IonIcon>
            <p>{event.eventType.typeName}</p>
          </div>
          <div className='tagBox'>
            <IonIcon icon={pricetagsOutline}></IonIcon>
            <p>{event.tag}</p>
          </div>
        </div>
        <h2>描述</h2>
        <p>{event.description}</p>
        <h2>活动时间</h2>
        <p>{event.gmtEventStart} - {event.gmtEventEnd}</p>
        <h2>报名时间</h2>
        <p>{event.gmtRegistrationStart} - {event.gmtRegistrationEnd}</p>
        <h2>活动地点</h2>
        <p>{event.location}</p>
      </IonContent>
      <IonButton slot="fixed" size="small" expand="block" disabled={event.state !== "CHECKING_IN"}>报名</IonButton>
    </IonPage >
  );
};

export default EventPage;