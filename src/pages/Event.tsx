import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IonContent, IonPage, IonButton, IonIcon, IonHeader, IonToolbar, IonBackButton, IonAlert } from '@ionic/react';
import { Event } from '../context';
import { getEventInfo, getUserParticipant } from '../apis/user';
import { chevronBack, folderOpenOutline, peopleOutline, pricetagsOutline } from 'ionicons/icons';
import './Event.scss';


const EventPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isRegistration, setIsRegistration] = useState<boolean>(true);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
  const [isParticipate, setIsParticipate] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    getEventInfo(Number(eventId)).then(res => {
      console.log(res);
      setEvent(res);
    });
    getUserParticipant(Number(eventId)).then(res => {
      console.log(res);
      setIsParticipate(Boolean(res.isParticipate));
      setIsRegistration(Boolean(res.isRegistration));
      setIsSubscribed(Boolean(res.isSubscribed));
    });
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  // TODO: subscribe
  const subscribe = () => { }

  const unsubscribe = () => { }

  const subscribeButton = () => {
    if (isSubscribed) {
      return (
        <IonButton id="unsubscribe-alert" color="danger" fill="outline" size="small" onClick={unsubscribe}>
          取消订阅
        </IonButton>
      );
    } else {
      return (
        <IonButton fill="outline" size="small" onClick={subscribe} disabled={event.state !== "NOT_STARTED" && event.state !== "CHECKING_IN"}>
          订阅
        </IonButton>
      );
    }
  }

  // TODO: register
  const register = () => { }

  const unregister = () => { }

  const registerButton = () => {
    if (isRegistration) {
      return (
        <IonButton id='unregister-alert' slot="fixed" color="danger" size="small" onClick={unregister}>
          取消报名
        </IonButton>
      );
    } else {
      return (
        <IonButton slot="fixed" size="small" onClick={register} disabled={event.state !== "REGISTRATION"}>
          报名
        </IonButton>
      );
    }
  }

  const close = () => {
    history.push('/home', { direction: 'back' });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" fill="clear" onClick={close}>
            <IonBackButton></IonBackButton>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} >
        <div className='eventWarpper'>
          <div className='titleWarpper'>
            <h1>{event.title}</h1>
            <div>{subscribeButton()}</div>
            <IonAlert
              header="真的要取消订阅吗"
              trigger="unsubscribe-alert"
              buttons={[
                {
                  text: '放弃',
                  role: 'cancel',
                  handler: () => {
                    console.log('Alert canceled');
                  },
                },
                {
                  text: '确认',
                  role: 'confirm',
                  handler: () => {
                    console.log('Alert confirmed');
                    unsubscribe();
                  },
                },
              ]}
              onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
            ></IonAlert>
          </div>
          <div className='detailInfoWarpper'>
            <IonIcon icon={peopleOutline}></IonIcon>
            <div className='deparments'>
              {event.departments.map((department) => (
                <p key={department.id}>
                  {department.departmentName}
                </p>
              ))}
            </div>
          </div>
          <div className='detailInfoWarpper'>
            <div className='typeWarpper'>
              <IonIcon icon={folderOpenOutline}></IonIcon>
              <p>{event.eventType.typeName}</p>
            </div>
            <div className='tagWarpper'>
              <IonIcon icon={pricetagsOutline}></IonIcon>
              <p>{event.tag}</p>
            </div>
          </div>
          <div className='detailInfoWarpper'>
            <div className='infoTimeTitleWarpper'>活动时间: </div>
            <div className='infoTimeWarpper'>{event.gmtEventStart.slice(5, -3).replace("-", ".")} - {event.gmtEventEnd.slice(5, -3).replace("-", ".")}</div>
          </div>
          <div className='detailInfoWarpper'>
            <div className='infoTimeTitleWarpper'>报名时间: </div>
            <div className='infoTimeWarpper'>{event.gmtRegistrationStart.slice(5, -3).replace("-", ".")} - {event.gmtRegistrationEnd.slice(5, -3).replace("-", ".")}</div>
          </div>
          <div className='detailInfoWarpper'>
            <div className='infoLocationTitleWarpper'>活动地点: </div>
            <div className='infoLocationWarpper'>{event.location}</div>
          </div>
          <p>{event.description}</p>
        </div>
      </IonContent>
      {registerButton()}
      <IonAlert
              header="真的要取消报名吗"
              trigger="unregister-alert"
              buttons={[
                {
                  text: '放弃',
                  role: 'cancel',
                  handler: () => {
                    console.log('Alert canceled');
                  },
                },
                {
                  text: '确认',
                  role: 'confirm',
                  handler: () => {
                    console.log('Alert confirmed');
                    unregister();
                  },
                },
              ]}
              onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
            ></IonAlert>
    </IonPage >
  );
};

export default EventPage;