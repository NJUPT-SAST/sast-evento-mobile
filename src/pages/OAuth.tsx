import React, { useEffect } from 'react';
import { linkLogin } from '../apis/login';
import './OAuth.scss';
import { IonButton, IonPage, useIonRouter } from '@ionic/react';
import { Browser } from '@capacitor/browser';
import { useUserInfoStore } from '../util/store';

const OAuth: React.FC = () => {
  const searchParams = new URLSearchParams(document.location.search)
  const router = useIonRouter();
  const info: string = 'Authorizing...';

  useEffect(() => {
    const code = String(searchParams.get('code'));
    Browser.removeAllListeners();
    Browser.close();
    linkLogin(code).then((res: any) => {
      localStorage.setItem('token', res.token);
      useUserInfoStore.setState({ userInfo: res.userInfo });
      router.push('/me');
    }, (error) => {
      router.push('/home');
    });
  }, []);

  return (
    <IonPage className='infoWarpper'>
      <p>{info}</p>
      <IonButton color="medium" fill='outline' onClick={() => { router.push('/home') }}>Cancel</IonButton>
    </IonPage>);
};

export default OAuth;