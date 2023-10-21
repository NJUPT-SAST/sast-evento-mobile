import React from 'react';
import { IonIcon, IonLabel, IonRouterOutlet, IonSegment, IonSegmentButton, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import Home from '../pages/Home';
import Me from '../pages/Me';
import { homeOutline, personOutline } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';

const BottomNaviBar: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact />
        <Route path="/me" component={Me} exact />
        <Redirect exact from="/" to="/home" />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={homeOutline}></IonIcon>
          <IonLabel>首页</IonLabel>
        </IonTabButton>

        <IonTabButton tab="me" href="/me">
          <IonIcon icon={personOutline}></IonIcon>
          <IonLabel>我的</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
export default BottomNaviBar;