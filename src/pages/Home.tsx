import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonList, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import EventCard from '../components/EventCard';
import './Home.scss';
import { useEffect, useState } from 'react';
import { getAllConductingEvent, getEventList } from '../apis/user';
import { Event } from '../context';

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isEnded, setIsEnded] = useState(false);
  useEffect(() => {
    getAllConductingEvent().then(res => {
      setEvents(res);
    });
    setPage(1);
    setTotal(5);
  }, []);

  const getItems = () => {
    console.log(total);
    console.log(page);
    
    
    if (total / 5 < page) {
      setIsEnded(true);
      return;
    }
    getEventList(page, 5).then((response) => {
      const newEvents: Event[] = response.result;
      console.log(newEvents);
      setEvents([...events, ...newEvents])
      setTotal(response.total);
      setPage(page + 1);
    })
  };
  // TODO: change layout styles to falls
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
            setTimeout(() => ev.target.complete(), 2000);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
        <IonToast
          isOpen={isEnded}
          onDidDismiss={() => setIsEnded(false)}
          message="到底了  qaq"
          duration={2000}
          color="medium"
        />
      </IonContent>
    </IonPage >
  );
};

export default Home;
