import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonNote, IonPage, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { getAllDepartments, getEventWithFilter, getSubscribeDepartments, subscribeDepartment } from '../apis/user';
import { useLocation } from 'react-router-dom';

import './Department.scss'
import { Department, Event } from '../context';
import { alarmSharp } from 'ionicons/icons';
import EventCardList from '../components/EventCardList';
import { useRefreshStore } from '../util/refresh';

const DepartmentPage: React.FC = () => {
  const maxWeeks = 25;
  const location = useLocation<{ departmentName: string }>();
  const [departmentName, setDepartmentName] = useState<string>(location.state?.departmentName);
  const { departmentId } = useParams<{ departmentId: string }>();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);
  const refreshStore = useRefreshStore();

  useEffect(() => {
    // get departmentName
    if (departmentName === undefined) {
      if (localStorage.getItem('departments') !== null) {
        setDepartmentName(
          JSON.parse(String(localStorage.getItem('departments')))
            .find((department: Department) => department.id === Number(departmentId)).departmentName
        );
      } else {
        getAllDepartments().then((res) => {
          localStorage.setItem('departments', JSON.stringify(res));
          setDepartmentName(
            JSON.parse(String(localStorage.getItem('departments')))
              .find((department: Department) => department.id === Number(departmentId)).departmentName
          );
        })
      }
    }

    // get events
    const currentDate = new Date();
    const date = new Date(currentDate.getTime() - maxWeeks * 7 * 24 * 60 * 60 * 1000);
    const time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    getEventWithFilter('', departmentId, time).then((res) => {
      setEvents(res);
    });

    // get isSubscribe
    if (localStorage.getItem('subscribeDepartments') !== null) {
      if (JSON.parse(String(localStorage.getItem('subscribeDepartments')))
        .find((department: Department) => department.id === Number(departmentId)) !== undefined) {
        setIsSubscribed(true);
      }
    } else {
      updateSubscribeDepartments();
    }
  }, [departmentId]);

  const updateSubscribeDepartments = () => {
    getSubscribeDepartments().then((res) => {
      refreshStore.setIsSubscribedDepartmentRefresh(true);
      localStorage.setItem('subscribeDepartments', JSON.stringify(res));
      if (JSON.parse(String(localStorage.getItem('subscribeDepartments')))
        .find((department: Department) => department.id === Number(departmentId)) !== undefined) {
        setIsSubscribed(true);
      }
    });
  }

  const subscribe = () => {
    subscribeDepartment(Number(departmentId), true).then((res) => {
      refreshStore.setIsSubscribedDepartmentRefresh(true);
      setIsSubscribed(true);
      updateSubscribeDepartments();
    });
  }

  const [presentAlert] = useIonAlert();

  const unsubscribe = () => {
    presentAlert({
      "header": "真的要取消订阅吗",
      "buttons": [
        {
          "text": "取消",
          "role": "cancel"
        },
        {
          "text": "确认",
          "role": "confirm",
          "handler": () => {
            subscribeDepartment(Number(departmentId), false).then((res) => {
              setIsSubscribed(false);
              updateSubscribeDepartments();
            });
          }
        }
      ]
    })
  }

  const subscribeButton = () => {
    if (isSubscribed) {
      return (
        <IonButton id='unsubscribeButton' slot='end' fill='clear' size='small' onClick={unsubscribe}>
          <IonIcon icon={alarmSharp} color='danger'></IonIcon>
        </IonButton>
      );
    }
    return (
      <IonButton slot='end' fill='clear' size='small' onClick={subscribe}>
        <IonIcon icon={alarmSharp}></IonIcon>
      </IonButton>
    );
  }

  return (
    <IonPage>
      <IonHeader translucent={false}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>{departmentName}</IonTitle>
          {subscribeButton()}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{departmentName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='eventContainer'>
          <EventCardList events={events} lines='none'></EventCardList>
          {events.length === 0 ? <></> : <div style={{ textAlign: "center", margin: "15px" }}><IonNote>没有更多的活动了</IonNote></div>}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default DepartmentPage;
