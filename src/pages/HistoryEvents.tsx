import { useEffect, useState } from "react";
import { Event } from "../context";
import { getHistoryEvents } from "../apis/user";
import { IonBackButton, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import EventCardList from "../components/EventCardList";
const HistoryEvents = () => {
  const [historyEvents, setHistoryEvents] = useState<Event[]>([]);
  const router = useIonRouter();
  useEffect(() => {
    getHistoryEvents().then(res => {
      setHistoryEvents(res);
    });
  }, []);
  const close = () => {
    router.push('/me', 'back');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" fill="clear" size='small' onClick={close}>
            <IonBackButton text="我的"></IonBackButton>
          </IonButton>
          <IonTitle>历史活动</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <EventCardList events={historyEvents} />
      </IonContent>
    </IonPage>
  )
}

export default HistoryEvents;