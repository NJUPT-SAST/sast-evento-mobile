import { IonBackButton, IonButtons, IonCard, IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToggle, IonToolbar } from "@ionic/react"
import { useSettingStore } from "../util/setting";

const Setting = () => {
  const settingStore = useSettingStore();
  const { isGuestMode, setIsGuestMode } = settingStore;
  const { isShowEventCardAnime, setIsShowEventCardAnime } = settingStore;
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Setting</IonTitle>
          <IonButtons>
            <IonBackButton></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonList>
            <IonItem lines="full">
              <IonToggle checked={isGuestMode} onIonChange={() => setIsGuestMode(!isGuestMode)}>
                游客模式
              </IonToggle>
            </IonItem>
            <IonItem lines="none">
              <IonToggle checked={isShowEventCardAnime} onIonChange={() => setIsShowEventCardAnime(!isShowEventCardAnime)}>
                显示活动卡片动画
              </IonToggle>
            </IonItem>
          </IonList>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default Setting;