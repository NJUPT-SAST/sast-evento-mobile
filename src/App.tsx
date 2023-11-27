import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Components */
import ThemeChange from './components/ThemeChange'

/* Pages */
import Login from './pages/Login';
import OAuth from './pages/OAuth';
import { homeOutline, layersOutline, personOutline } from 'ionicons/icons';
import DepartmentsPage from './pages/AllDepartments';
import EventPage from './pages/Event';
import Home from './pages/Home';
import Me from './pages/Me';
import SubscriptionsPage from './pages/SubscriptionsPage';
import DepartmentPage from './pages/Department';
import HistoryEvents from './pages/HistoryEvents';
import ScanningPage from './pages/ScanningPage';
import Setting from './pages/Setting';

setupIonicReact({ swipeBackEnabled: false });

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <ThemeChange>
          
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/departments" component={DepartmentsPage} exact />
              <Route path="/event/:eventId" component={EventPage} exact />
              <Route path="/department/:departmentId" component={DepartmentPage} exact />
              <Route path="/oauth" component={OAuth} exact ></Route>
              <Route path="/login" component={Login} exact ></Route>
              <Route path="/home" component={Home} exact />
              <Route path="/me" component={Me} exact />
              <Route path="/history" component={HistoryEvents} exact />
              <Route path="/subscriptions" component={SubscriptionsPage} exact />
              <Route path="/scanner" component={ScanningPage} exact />
              <Route path="/setting" component={Setting} exact />
              <Redirect exact from="/" to="/home" />
            </IonRouterOutlet>

            <IonTabBar slot="bottom" id="app-tab-bar" translucent={false}>
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
        </ThemeChange>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
