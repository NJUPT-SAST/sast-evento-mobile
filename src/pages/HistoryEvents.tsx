import { useEffect, useState } from "react";
import { Event } from "../context";
import { getHistoryEvents } from "../apis/user";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import EventCardList from "../components/EventCardList";
const HistoryEvents = () => {
  const [historyEvents, setHistoryEvents] = useState<Event[] | null>(null);
  useEffect(() => {
    getHistoryEvents().then(res => {
      setHistoryEvents(res);
    }, () => {
      setHistoryEvents([]);
    });
  }, []);

  return (
    <IonPage>
      <IonHeader translucent={false}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>历史活动</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader translucent={false} collapse="condense">
          <IonToolbar>
            <IonTitle size="large">历史活动</IonTitle>
          </IonToolbar>
        </IonHeader>
        <EventCardList events={historyEvents} lines="none" />
      </IonContent>
    </IonPage>
  )
}

export default HistoryEvents;