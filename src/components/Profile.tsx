import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonModal, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Profile.scss'
import { useRef } from 'react';
import { useUserInfoStore } from '../util/store';
import { updateUserInfo } from '../apis/user';
import { UserInfo } from '../context';

interface Props {
  trigger: string;
}

const Profile: React.FC<Props> = ({ trigger }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const userInfoStore = useUserInfoStore((state) => state);
  const userInfo = userInfoStore.userInfo as UserInfo;
  const saveChanges = () => {
    updateUserInfo(userInfo as UserInfo).then((res) => {
      userInfoStore.updateUserInfo(userInfo);
    });
    modal.current?.dismiss();
  }


  return (
    <>
      <IonModal trigger={trigger} ref={modal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Modal</IonTitle>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>Close</IonButton>
            </IonButtons>

            <IonButtons slot="end">
              <IonButton onClick={saveChanges}>Save</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList inset={true}>
            <IonItem>
              <IonInput
                label='昵称'
                value={userInfo?.nickname}
                onIonChange={(e) => { userInfo.nickname = e.detail.value! }}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput disabled label='组织' value={userInfo?.organization}></IonInput>
            </IonItem>
          </IonList>
          <IonList inset={true}>
            <IonItem>
              <IonTextarea
                slot="start"
                placeholder='自我介绍'
                autoGrow={true}
                value={userInfo?.biography}
                onIonChange={(e) => { userInfo.biography = e.detail.value! }}
              ></IonTextarea>
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>
    </>
  )
}

export default Profile;