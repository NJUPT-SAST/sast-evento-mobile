import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonToast, IonBackButton, IonButtons, isPlatform, IonCard, IonAvatar, IonTitle } from '@ionic/react';
import './Login.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getLoginKey, pwLogin } from '../apis/login';
import JSEncrypt from 'jsencrypt';
import { Browser } from '@capacitor/browser';
import OnDevAlert from '../components/OnDevAlert';
import { useSettingStore } from '../util/setting';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();
  const linkUrl = 'https://link.sast.fun/auth?client_id=a5047c7f-d8ae-40f5-85de-5c380ecc0b51&code_challenge=YillThSRrGTj6mXqFfDPinX7G35qEQ1QEyWV6PDSEuc%3D&code_challenge_method=S256&redirect_uri=https://evento.sast.fun/oauth&response_type=code&scope=all&state=xyz'

  const login = () => {
    getLoginKey(username).then(res => {
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey('-----BEGIN RSA PUBLIC KEY-----\n' +
        res.str +
        '\n-----END RSA PUBLIC KEY-----');
      const encryptedPassword = encrypt.encrypt(password);
      pwLogin(username, String(encryptedPassword)).then(res => {
        localStorage.setItem("token", res);
        history.push('/me');
      }, (error) => {
        setUsername('');
        setPassword('');
        setShowToast(true);
      })
    }, (error) => {
      console.log();
    })
  }

  const register = () => {
    // history.push('/register');
  }

  const linkLogin = async () => {
    if (isPlatform("ios")) {
      await Browser.open({ url: linkUrl });
    } else {
      const a = document.createElement('a');
      a.setAttribute('href', linkUrl);
      a.setAttribute('id', "oauth");
      if (!document.getElementById('oauth')) {
        document.body.appendChild(a);
      }
      a.click();
      a.remove();
    }
  }

  const close = () => {
    useSettingStore.setState({ isGuestMode: true })
    history.goBack();
  }

  return (
    <IonPage>
      <IonHeader translucent={false}>
        <IonToolbar>
          <IonTitle>登录</IonTitle>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonList>
            <IonItem className='inputWarpper'>
              <IonInput
                label='用户名'
                labelPlacement="fixed"
                placeholder='请输入用户名'
                value={username}
                clearOnEdit={true}
                onIonChange={e => setUsername(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label='密码'
                labelPlacement="fixed"
                placeholder='请输入密码'
                type="password"
                value={password}
                clearOnEdit={true}
                onIonChange={e => setPassword(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonList>
        </IonCard>
        <IonCard>
          <IonList>
            <IonItem onClick={login} disabled={(username === "") || (password === "")}>
              <IonLabel color={(username === "") || (password === "") ? "medium" : "primary"}>登录</IonLabel>
            </IonItem>
            <IonItem onClick={register} id='registerItem' disabled={true}>
              <IonLabel color="primary">注册</IonLabel>
            </IonItem>
            <OnDevAlert trigger='registerItem'></OnDevAlert>
          </IonList>
        </IonCard>
        <IonCard>
          <IonList lines='none' inset={true}>
            <IonItem onClick={linkLogin}>
              <IonAvatar slot='start'>
                <img alt='linkLogin' src='/link.ico' />
              </IonAvatar>
              <IonLabel color="">Link 登录</IonLabel>
            </IonItem>
          </IonList>
        </IonCard>
        {/* <div className='oauthIconWarpper'>
            <div className='oauthIcon'>
              <img src='/link.ico'></img>
            </div>
            <div className='oauthIcon'>
              <img src='/link.ico'></img>
            </div>
            <div className='oauthIcon'>
              <img src='/link.ico'></img>
            </div>
          </div> */}
      </IonContent>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="用户名或密码错误"
        duration={2000}
        color="danger"
      />
    </IonPage >
  );
}

export default Login;