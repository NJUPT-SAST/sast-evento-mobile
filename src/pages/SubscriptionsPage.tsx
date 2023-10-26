import { IonContent, IonHeader, IonPage, IonSegment, IonSegmentButton, IonTab, IonToolbar } from '@ionic/react';
import './SubscriptionsPage.scss'
import { useState } from 'react';

const SubscriptionsPage: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>('subscriptions');

  const handleSegmentChange = (e: any) => {
    setSelectedSegment(e.detail.value);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSegment onIonChange={handleSegmentChange} value="subscriptions">
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
        {selectedSegment === 'subscriptions' &&
          <div>

          </div>
        }
        {
          selectedSegment === 'participate' &&
          <div>

          </div>
        }
      </IonContent>
    </IonPage>
  );
}

export default SubscriptionsPage;