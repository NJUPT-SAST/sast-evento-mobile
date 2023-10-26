import React from 'react';
import { IonIcon, IonLabel, IonRouterOutlet, IonSegment, IonSegmentButton, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import Home from '../pages/Home';
import Me from '../pages/Me';
import EventPage from '../pages/Event';
import DepartmentPage from '../pages/Department'
import DepartmentsPage from '../pages/AllDepartments';
import { homeOutline, layersOutline, personOutline } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';
import SubscriptionsPage from '../pages/SubscriptionsPage';

const BottomNaviBar: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact />
        <Route path="/me" component={Me} exact />
        <Route path="/subscriptions" component={SubscriptionsPage} exact />
        <Route path="/departments" component={DepartmentsPage} exact />
        <Route path="/event/:eventId" component={EventPage} exact />
        <Route path="/department/:departmentId" component={DepartmentPage} exact />
        <Redirect exact from="/" to="/home" />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={homeOutline}></IonIcon>
          {/* <IonLabel>首页</IonLabel> */}
        </IonTabButton>
        <IonTabButton tab="subscriptions" href="/subscriptions">
          <IonIcon icon={layersOutline}></IonIcon>
        </IonTabButton>
        <IonTabButton tab="me" href="/me">
          <IonIcon icon={personOutline}></IonIcon>
          {/* <IonLabel>我的</IonLabel> */}
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
export default BottomNaviBar;