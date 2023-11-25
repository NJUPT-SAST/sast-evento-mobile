import { IonContent, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import ConductingEvents from '../components/ConductingEvents';
import AllEvent from '../components/AllEvents';
import { useHistory } from 'react-router';
import SlideImages from '../components/SlideImages';
import { menuOutline } from 'ionicons/icons';

import './Home.scss';

const Home: React.FC = () => {
  const history = useHistory();

  const toDepartmentsPage = () => {
    history.push('/departments', { direction: 'forward' });
  }

  const handleRefresh = () => {
    window.location.reload();
  }

  return (
    <IonPage>
      <IonHeader translucent={false}>
        <IonToolbar className='headerWarpper'>
          <IonTitle slot='secondary'>
            首页
          </IonTitle>
          <IonIcon slot='end' icon={menuOutline} size='large' color='primary' onClick={toDepartmentsPage}></IonIcon>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className='homeComponentsWarpper'>
          <SlideImages></SlideImages>
          <ConductingEvents></ConductingEvents>
          <AllEvent></AllEvent>
        </div>
      </IonContent>
    </IonPage >
  );
};

export default Home;
