import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton, IonTab, IonToolbar } from '@ionic/react';
import './SubscriptionsPage.scss'
import { useState } from 'react';
import SubscribePage from '../components/Subscribe';
import RegisteredEvents from '../components/RegisteredEvents';

const SubscriptionsPage: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>('subscriptions');

  const handleRefresh = () => {
    window.location.reload();
  }
  const handleSegmentChange = (e: any) => {
    setSelectedSegment(e.detail.value);
  }
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