import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import EventCard from '../components/EventCard';
import './Home.scss';
import { useEffect, useState } from 'react';
import { getAllConductingEvent, getEventList } from '../apis/user';
import { Event } from '../context';

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getAllConductingEvent().then(res => {
      console.log(res);
      setEvents(res);
    });
  }, []);

  const getItems = () => {
    let page: number = 1;
    let total: number = 0;
    let newEvents: Event[] = [];
    getEventList(page++, 5).then((response) => {
      newEvents = response.data.result;
      total = response.data.total;
    })
    setEvents([...events, ...newEvents]);
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonList class='eventContainer'>
          {events.map((item, index) => (
            <IonItem key={item.id}>
              <EventCard event={item} ></EventCard>
            </IonItem>
          ))}
        </IonList>
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            getItems();
            setTimeout(() => ev.target.complete(), 500);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage >
  );
};

export default Home;
