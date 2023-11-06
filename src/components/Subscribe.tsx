import { IonCard, IonItem, IonLabel } from "@ionic/react";
import SubscribeDepartments from "./SubscribeDepartments"
import "./Subcribe.scss"
import SubscribedEvents from "./SubscribedEvents";
const subcribePage = () => {
  return (
    <div className="subscribePageWarpper">
      <div className="mySubscribeDepartmentsWarpper">
        <IonCard>
          <IonItem>
            <div className="mySubscribeDepartmentsTitleWarpper">
              我订阅的部门
            </div>
          </IonItem>
          <IonItem>
            <div id="mySubscribeDepartmentsContentWarpper" className="mySubscribeDepartmentsContentWarpper">
              <SubscribeDepartments></SubscribeDepartments>
            </div>
          </IonItem>
        </IonCard>
      </div>
      <div className="mySubscribeEventsWarpper">
        <IonCard>
          <IonItem>
            <div className="mySubscribeEventsTitleWarpper">
              我订阅的活动
            </div>
          </IonItem>
          <div className="mySubscribeEventsContentWarpper">
            <SubscribedEvents></SubscribedEvents>
          </div>
        </IonCard>
      </div>
    </div>
  )
}

export default subcribePage;