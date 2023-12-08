import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonContent, IonPage, IonButton, IonIcon, IonHeader, IonToolbar, IonBackButton, IonAlert, useIonRouter, IonButtons } from '@ionic/react';
import { Event } from '../context';
import { getEventInfo, getUserParticipant, registerEvent, subcribeEvent } from '../apis/user';
import { folderOpenOutline, peopleOutline, pricetagsOutline, shareSocialOutline, alarmSharp, timeOutline, businessOutline, documentOutline, statsChartOutline, statsChartSharp } from 'ionicons/icons';
import './Event.scss';
import { Share } from '@capacitor/share';
import { LocalNotificationSchema, LocalNotifications, ScheduleOptions, Schedule, LocalNotificationDescriptor, CancelOptions } from '@capacitor/local-notifications';
import { useRefreshStore } from '../util/refresh';


const EventPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isRegistration, setIsRegistration] = useState<boolean>(false);
  const [showRegisterAlert, setShowRegisterAlert] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState<boolean>(false);
  const [showSubscribeAlert, setShowSubscribeAlert] = useState(false);
  const [isParticipate, setIsParticipate] = useState<boolean>(false);
  const refreshStore = useRefreshStore();

  const router = useIonRouter();

  useEffect(() => {
    getEventInfo(Number(eventId)).then(res => {
      console.log(res);
      setEvent(res);
    });
    getUserParticipant(Number(eventId)).then(res => {
      console.log(res);
      setIsParticipate(res.isParticipate === null ? false : Boolean(res.isParticipate));
      setIsRegistration(res.isRegistration === null ? false : Boolean(res.isRegistration));
      setIsSubscribe(res.isSubscribe === null ? false : Boolean(res.isSubscribe));
    });
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  const toDepartment = (id: number) => () => {
    router.push(`/department/${id}`, 'forward');
  }

  const timeSimplify = (startTime: string, endTime: string) => {
    // get current year
    const year = new Date().getFullYear();
    if (startTime.slice(0, 4) !== year.toString()) {
      return startTime.replace("-", ".") + " - " + endTime.replace("-", ".");
    }
    if (startTime.slice(5, 7) === endTime.slice(5, 7) && startTime.slice(8, 10) === endTime.slice(8, 10)) {
      return startTime.slice(5, -3).replace("-", ".") + " - " + endTime.slice(11, -3).replace("-", ".");
    }
    return startTime.slice(5, -3).replace("-", ".") + " - " + endTime.slice(5, -3).replace("-", ".");
  }

  const subscribe = () => {
    subcribeEvent(Number(eventId), true).then(() => {
      refreshStore.setIsSubscribedEventsRefresh(true);
      setIsSubscribe(true);
      const scheduleDate = new Date();
      scheduleDate.setFullYear(Number(event.gmtEventStart.slice(0, 4)));
      scheduleDate.setMonth(Number(event.gmtEventStart.slice(5, 7)) - 1);
      scheduleDate.setDate(Number(event.gmtEventStart.slice(8, 10)));
      scheduleDate.setHours(Number(event.gmtEventStart.slice(11, 13)));
      scheduleDate.setMinutes(Number(event.gmtEventStart.slice(14, 16)));
      scheduleDate.setSeconds(0);
      const schedule: Schedule = {
        at: scheduleDate
      }
      const localNotificationSchema: LocalNotificationSchema = {
        title: "即将开始：" + event.title,
        body: event.description,
        schedule: schedule,
        id: Number(eventId)
      };
      const scheduleOptions: ScheduleOptions = {
        notifications: [localNotificationSchema]
      }
      LocalNotifications.schedule(scheduleOptions);
      console.log(scheduleOptions);
      console.log(localNotificationSchema);
    }, (error) => {
      console.log(error);
      setIsSubscribe(false);
    });
  }

  const unsubscribe = () => {
    subcribeEvent(Number(eventId), false).then(() => {
      refreshStore.setIsSubscribedEventsRefresh(true);
      setIsSubscribe(false);
      const localNotificationDescriptor: LocalNotificationDescriptor = {
        id: Number(eventId)
      }
      const cancelOptions: CancelOptions = {
        notifications: [localNotificationDescriptor]
      }
      LocalNotifications.cancel(cancelOptions);
      console.log(cancelOptions);
    }, (error) => {
      console.log(error);
      setIsSubscribe(true);
    });
  }

  const share = async () => {
    await Share.share({
      title: event.title,
      text: event.description,
      url: window.location.href,
      dialogTitle: '分享活动'
    })
  }

  const subscribeButton = () => {
    if (isSubscribe) {
      return (
        <IonButton id="unsubscribe-alert" size="small" color="danger" onClick={() => setShowSubscribeAlert(true)} className='subscribeButton'>
          <IonIcon icon={alarmSharp}></IonIcon>
        </IonButton>
      );
    } else {
      return (
        <IonButton fill="outline" size="small" onClick={subscribe} disabled={event.state !== 1 && event.state !== 2} className='subscribeButton'>
          <IonIcon icon={alarmSharp}></IonIcon>
        </IonButton>
      );
    }
  }

  const register = () => {
    registerEvent(Number(eventId), true).then(() => {
      refreshStore.setIsRegisteredEventsRefresh(true);
      setIsRegistration(true);
    }, (error) => {
      console.log(error);
      setIsRegistration(false);
    });
  }

  const unregister = () => {
    registerEvent(Number(eventId), false).then(() => {
      refreshStore.setIsRegisteredEventsRefresh(true);
      setIsRegistration(false);
    }, (error) => {
      console.log(error);
      setIsRegistration(true);
    });
  }

  const registerButton = () => {
    if (isRegistration) {
      return (
        <IonButton id='unregister-alert' size="small" color="danger" onClick={() => setShowRegisterAlert(true)} className='registerButton'>
          <IonIcon icon={statsChartOutline}></IonIcon>取消报名
        </IonButton>
      );
    } else {
      return (
        <IonButton size="small" onClick={register} disabled={event.state === 4 || event.state === 5} className='registerButton'>
          <IonIcon icon={statsChartSharp}></IonIcon>报名
        </IonButton>
      );
    }
  }

  return (
    <IonPage>
      <IonHeader translucent={false}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonButton slot="end" fill="clear" size='small' onClick={share}>
            <IonIcon icon={shareSocialOutline}></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} >
        <div className='eventWarpper'>
          <div className='titleWarpper'>
            <h1>{event.title}</h1>
          </div>
          <div className='metaInfoWarpper'>
            <div className='departmentsWarpper'>
              <IonIcon icon={peopleOutline}></IonIcon>
              <div className='departments'>
                {event.departments.map((department) => (
                  <p key={department.id} onClick={toDepartment(department.id)}>
                    {department.departmentName}
                  </p>
                ))}
              </div>
            </div>
            <div className='categoryWarpper'>
              <div className='typeWarpper'>
                <IonIcon icon={folderOpenOutline}></IonIcon>
                <p>{event.eventType.typeName}</p>
              </div>
              <div className='tagWarpper'>
                <IonIcon icon={pricetagsOutline}></IonIcon>
                <p>{event.tag}</p>
              </div>
            </div>
          </div>
          <div className='operationWarpper'>
            <div className='registerButtonWarpper'>{registerButton()}</div>
            <IonAlert
              header="真的要取消报名吗"
              isOpen={showRegisterAlert}
              onDidDismiss={() => setShowRegisterAlert(false)}
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
                    unregister();
                  },
                },
              ]}
            ></IonAlert>
            <div className='subscribeButtonWarpper'>{subscribeButton()}</div>
            <IonAlert
              header="真的要取消订阅吗"
              isOpen={showSubscribeAlert}
              onDidDismiss={() => setShowSubscribeAlert(false)}
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
                    unsubscribe();
                  },
                },
              ]}
            ></IonAlert>
          </div>
          <div className='detailInfoWarpper'>
            <div>
              <div className='infoTimeTitleWarpper'>
                <IonIcon icon={timeOutline}></IonIcon>活动时间
              </div>
              <div className='infoTimeWarpper'>{timeSimplify(event.gmtEventStart, event.gmtEventEnd)}</div>
            </div>
            <div>
              <div className='infoTimeTitleWarpper'>
                <IonIcon icon={timeOutline}></IonIcon>报名时间
              </div>
              <div className='infoTimeWarpper'>{timeSimplify(event.gmtRegistrationStart, event.gmtRegistrationEnd)}</div>
            </div>
            <div>
              <div className='infoLocationTitleWarpper'>
                <IonIcon icon={businessOutline}></IonIcon>活动地点
              </div>
              <div className='infoLocationWarpper'>{event.location}</div>
            </div>
            <div>
              <div className='infoDescriptionTitleWarpper'>
                <IonIcon icon={documentOutline}></IonIcon>活动描述
              </div>
              <div className='infoDescriptionWarpper'>{event.description}</div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage >
  );
};

export default EventPage;