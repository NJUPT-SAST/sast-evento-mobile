import { IonCard, IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import SubscribeDepartments from "./SubscribeDepartments"
import "./Subcribe.scss"
import SubscribedEvents from "./SubscribedEvents";
const subcribe = () => {
  return (
    <div className="subscribePageWarpper">
      <div style={{ height: "5px" }}></div>
      <div className="mySubscribeDepartmentsWarpper">
        <IonList>
          <IonListHeader mode="ios" style={{"--color": "none"}}>
            我订阅的部门
          </IonListHeader>
          <IonCard style={{"--color": "none", "padding": "0 5px"}}>
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

export default subcribe;