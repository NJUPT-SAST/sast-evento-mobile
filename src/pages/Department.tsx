import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IonBackButton, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { getAllDepartments, getEventWithFilter, getSubscribeDepartments, subscribeDepartment } from '../apis/user';
import EventCard from '../components/EventCard';
import { useLocation } from 'react-router-dom';

import './Department.scss'
import { Department, Event } from '../context';
import { alarmSharp } from 'ionicons/icons';

const DepartmentPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ departmentName: string }>();
  const [departmentName, setDepartmentName] = useState<string>(location.state?.departmentName);
  const { departmentId } = useParams<{ departmentId: string }>();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
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
    getEventWithFilter('', departmentId, '').then((res) => {
      console.log(res);
      setEvents(res);
    });
    console.log(isSubscribed);
    
  }, [departmentId]);

  const updateSubscribeDepartments = () => {
    getSubscribeDepartments().then((res) => {
      localStorage.setItem('subscribeDepartments', JSON.stringify(res));
    });
  }

  const close = () => {
    history.push(`/home`, { direction: 'back' });
  }

  const subscribe = () => {
    subscribeDepartment(Number(departmentId), true).then((res) => {
      console.log(res);
      setIsSubscribed(true);
      updateSubscribeDepartments();
    });
  }

  const unsubscribe = () => {
    subscribeDepartment(Number(departmentId), false).then((res) => {
      console.log(res);
      setIsSubscribed(false);
      updateSubscribeDepartments();
    });
  }

  const subscribeButton = () => {
    if (isSubscribed) {
      return (
        <IonButton slot='end' fill='clear' size='small' onClick={unsubscribe}>
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
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" fill="clear" size='small' onClick={close}>
            <IonBackButton></IonBackButton>
          </IonButton>
          <IonTitle>{departmentName}</IonTitle>
          {subscribeButton()}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='eventContainer'>
          <IonList>
            {events.map((item, index) => (
              <IonItem key={item.id}>
                <EventCard event={item}></EventCard>
              </IonItem>
            ))}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default DepartmentPage;
