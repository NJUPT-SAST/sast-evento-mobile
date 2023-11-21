import { GestureDetail, IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton, IonTab, IonToolbar, createGesture } from '@ionic/react';
import './SubscriptionsPage.scss'
import { useEffect, useState } from 'react';
import SubscribePage from '../components/Subscribe';
import RegisteredEvents from '../components/RegisteredEvents';

const SubscriptionsPage: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>('subscriptions');
  const content = document.querySelector('ion-content') as HTMLElement;
  let contentMove = 0;
  const handleRefresh = () => {
    window.location.reload();
  }
  const handleSegmentChange = (e: any) => {
    setSelectedSegment(e.detail.value);
  }

  const onStart = () => {
    console.log('onStart');
  }

  const onMove = (detail: GestureDetail) => {
    console.log('onMove');
    const { type, currentX, deltaX, velocityX } = detail;
    // move ion-content
    if (selectedSegment === 'subscriptions' && deltaX < 0) {
      content.style.transform = `translateX(${deltaX}px)`;
    } else if (selectedSegment === 'participate' && deltaX > 0) {
      content.style.transform = `translateX(${deltaX}px)`;
    }
    contentMove = deltaX;
  }

  const onEnd = () => {
    if (Math.abs(contentMove) > 250) {
      if (contentMove < 0) {
        setSelectedSegment('participate');
      } else {
        setSelectedSegment('subscriptions');
      }
    }
    content.style.transform = 'translateX(0px)';
  }

  useEffect(() => {
    // use createGesture to achive left and right swipe
    const gesture = createGesture({
      el: document.querySelector('ion-content')!,
      gestureName: 'swipe',
      onStart: () => onStart(),
      onMove: (detail) => onMove(detail),
      onEnd: () => onEnd(),
      passive: false,
    });
    gesture.enable();
  })
  return (
    <IonPage>
      <IonHeader translucent={false}>
        <IonToolbar>
          <IonSegment onIonChange={handleSegmentChange} value={selectedSegment}>
            <IonSegmentButton value="subscriptions">
              订阅
            </IonSegmentButton>
            <IonSegmentButton value="participate">
              参与
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {selectedSegment === 'subscriptions' &&
          <div>
            <SubscribePage></SubscribePage>
          </div>
        }
        {
          selectedSegment === 'participate' &&
          <div>
            <RegisteredEvents></RegisteredEvents>
          </div>
        }
      </IonContent>
    </IonPage>
  );
}

export default SubscriptionsPage;