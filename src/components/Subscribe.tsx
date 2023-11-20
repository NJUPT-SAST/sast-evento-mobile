import { IonCard, IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import SubscribeDepartments from "./SubscribeDepartments"
import "./Subcribe.scss"
import SubscribedEvents from "./SubscribedEvents";
const subcribePage = () => {
  return (
    <div className="subscribePageWarpper">
      <div style={{ height: "5px" }}></div>
      <div className="mySubscribeDepartmentsWarpper">
        <IonList>
          <IonListHeader>
            我订阅的部门
          </IonListHeader>
          <IonCard>
            <div id="mySubscribeDepartmentsContentWarpper" className="mySubscribeDepartmentsContentWarpper">
              <SubscribeDepartments></SubscribeDepartments>
            </div>
          </IonCard>
        </IonList>
      </div>
      <div className="mySubscribeEventsContentWarpper">
        <SubscribedEvents></SubscribedEvents>
      </div>
    </div>
  )
}

export default subcribePage;