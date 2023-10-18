import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import EventCard from '../components/EventCard';
import './Home.scss';
import { useState, useEffect } from 'react';

const Home: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);

  const generateItems = () => {
    const newItems = [];
    for (let i = 0; i < 5; i++) {
      newItems.push(`Item ${1 + items.length + i}`);
    }
    setItems([...items, ...newItems]);
  };

  useEffect(() => {
    generateItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <IonPage>
      <IonContent fullscreen>
        {/* <IonContent class='slidebox'></IonContent> */}
        <IonList class='eventContainer'>
          {items.map((item, index) => (
            <IonItem key={item}>
              <EventCard></EventCard>
            </IonItem>
          ))}
        </IonList>
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            generateItems();
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