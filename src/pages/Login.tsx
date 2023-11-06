import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonButton, IonInput, IonItem, IonLabel, IonList, IonToast, IonIcon, IonBackButton, IonButtons } from '@ionic/react';
import './Login.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { closeOutline } from 'ionicons/icons';
import { getLoginKey, pwLogin } from '../apis/login';
import JSEncrypt from 'jsencrypt';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();
  // const linkUrl = 'http://192.168.0.154:3000/auth?client_id=f04a5a82-d394-456c-82d0-57623b8549d7&code_challenge=YillThSRrGTj6mXqFfDPinX7G35qEQ1QEyWV6PDSEuc%3D&code_challenge_method=S256&redirect_uri=http://192.168.0.154:8102/oauth&response_type=code&scope=all&state=xyz'
  const linkUrl = 'https://link.sast.fun/auth?client_id=f04a5a82-d394-456c-82d0-57623b8549d7&code_challenge=YillThSRrGTj6mXqFfDPinX7G35qEQ1QEyWV6PDSEuc%3D&code_challenge_method=S256&redirect_uri=http://192.168.0.154:8102/oauth&response_type=code&scope=all&state=xyz'

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
    history.push('/register');
  }

  const linkLogin = () => {
    // a tag href linkUrl
    let a = document.createElement("a");
    a.setAttribute(
      "href",
      linkUrl
    );
    a.setAttribute("target", "_blank");
    a.setAttribute("id", "link");
    if (!document.getElementById("link")) {
      document.body.appendChild(a);
    }
    a.click();
    a.remove();
  }

  const close = () => {
    history.goBack();
  }

  return (
    <IonPage>
      <IonContent>
        <IonHeader collapse="condense" className="headerWarpper">
          <IonToolbar>
            <IonButtons slot="start" onClick={close}>
              <IonIcon icon={closeOutline} size='large'></IonIcon>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className='loginWarpper'>
            <IonLabel>
              <h1 className='loginText'>登录</h1>
            </IonLabel>
            <IonList>
              <IonItem className='inputWarpper'>
                <IonInput
                  label='用户名'
                  labelPlacement='floating'
                  value={username}
                  clearOnEdit={true}
                  onIonChange={e => setUsername(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label='密码'
                  labelPlacement='floating'
                  type="password"
                  value={password}
                  clearOnEdit={true}
                  onIonChange={e => setPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonList>
            <IonButton expand="block" shape="round" onClick={login}>
              登录
            </IonButton>
            <IonButton expand="block" fill='outline' shape="round" onClick={linkLogin}>
              Link 登录
            </IonButton>
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
            <div className='registerWarpper'>
              <IonLabel>还没有账号？ </IonLabel>
              <IonLabel color="tertiary">注册</IonLabel>
            </div>
          </div>
        </IonContent>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="用户名或密码错误"
          duration={2000}
          color="danger"
        />
      </IonContent>
    </IonPage >
  );
}

export default Login;