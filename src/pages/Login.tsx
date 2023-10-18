import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel, IonList, IonToast, IonIcon, IonBackButton, IonButtons } from '@ionic/react';
import './Login.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { closeOutline } from 'ionicons/icons';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const login = () => {
    if (username === 'admin' && password === 'admin') {
      history.push('/home');
    } else {
      setShowToast(true);
    }
  }

  const register = () => {
    history.push('/register');
  }

  const close = () => {
    history.goBack();
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense" className="fixedButton">
          <IonToolbar>
            <IonButtons slot="start" onClick={close}>
              <IonIcon icon={closeOutline} size='large'></IonIcon>
            </IonButtons>
            {/* <IonTitle>登录</IonTitle> */}
          </IonToolbar>
        </IonHeader>
        <IonContent className='loginBox'>
          <IonList>
            <IonLabel>
              <h1 className='loginText'>登录</h1>
            </IonLabel>
            <IonItem className='inputBox'>
              <IonLabel position="floating">用户名</IonLabel>
              <IonInput fill={'outline'} value={username} onIonChange={e => setUsername(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">密码</IonLabel>
              <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
            </IonItem>
          </IonList>
          <IonButton expand="block" shape="round" onClick={login}>登录</IonButton>
          <IonLabel>还没有账号？</IonLabel><IonLabel color="tertiary">注册</IonLabel>
        </IonContent>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="用户名或密码错误"
          duration={2000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
}

export default Login;