import { IonContent, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import ConductingEvents from '../components/ConductingEvents';
import AllEvent from '../components/AllEvents';

import 'swiper/css';
import 'swiper/css/effect-cards';
import './Home.scss';
import AllDepartments from '../components/AllDepartments';
import SlideImages from '../components/SlideImages';

const Home: React.FC = () => {
  const [selectedEventSegment, setSelectedEventSegment] = useState<string>('recommend');

  const switchBar = (e: any) => {
    console.log(e);
    setSelectedEventSegment(e.detail.value)
  }


  // TODO: change layout styles to falls
  return (
    <IonPage>
      <IonHeader>
          <IonToolbar>
            <IonSegment value={selectedEventSegment} onIonChange={e => switchBar(e)}>
              <IonSegmentButton value="recommend">
                <IonLabel>推荐</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="department">
                <IonLabel>部门</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </IonHeader>
      <IonContent fullscreen>
        {selectedEventSegment === 'recommend' &&
          <div className='homeComponentsWarpper'>
            <SlideImages></SlideImages>
            <ConductingEvents></ConductingEvents>
            <AllEvent></AllEvent>
          </div>}
        {selectedEventSegment === 'department' &&
          <div className='homeComponentsWarpper'>
            <AllDepartments></AllDepartments>
          </div>}
      </IonContent>
    </IonPage >
  );
};

export default Home;
