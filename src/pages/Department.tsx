import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IonBackButton, IonButton, IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { getEventWithFilter } from '../apis/user';
import EventCard from '../components/EventCard';
import { useLocation } from 'react-router-dom';

import { Department, Event } from '../context';

const DepartmentPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ departmentName?: string }>();
  let departmentName = location.state?.departmentName;
  const { departmentId } = useParams<{ departmentId: string }>();

  const [events, setEvents] = useState<Event[]>([]);

  const close = () => {
    history.push(`/home`, { direction: 'back' });
  }

  useEffect(() => {
    console.log(departmentName);
    if (departmentName === undefined) {
      departmentName = Array<any>(localStorage.getItem('departments')).find((department: Department) => department.id === Number(departmentId))?.departmentName;
      console.log(departmentName);

    }
    getEventWithFilter('', departmentId, '').then((res) => {
      console.log(res);
      setEvents(res);
    });
  }, [departmentId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" fill="clear" onClick={close}>
            <IonBackButton></IonBackButton>
          </IonButton>
          <IonTitle>{departmentName}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {events.map((item, index) => (
            <IonItem key={item.id}>
              <EventCard event={item}></EventCard>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default DepartmentPage;
