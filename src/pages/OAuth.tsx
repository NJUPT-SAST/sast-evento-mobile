import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { linkLogin } from '../apis/login';
import './OAuth.scss';
import { IonButton, IonPage } from '@ionic/react';

const OAuth: React.FC = () => {
  const searchParams = new URLSearchParams(document.location.search)
  const history = useHistory();
  let info: string = 'Authorizing...';

  useEffect(() => {
    const code = String(searchParams.get('code'));
    console.log(code);
    
    linkLogin(code).then((res: any) => {
      info = "Jumping to home page"
      localStorage.setItem('token', res.token);
      localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
      history.push('/home');
    });
  }, [history]);

  return (
    <IonPage className='infoWarpper'>
      <p>{info}</p>
      <IonButton color="medium" fill='outline' onClick={() => history.push('/home')}>Cancel</IonButton>
    </IonPage>);
};

export default OAuth;