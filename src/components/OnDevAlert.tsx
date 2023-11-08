import React from 'react';
import { IonAlert } from '@ionic/react';

interface Props {
  trigger: string;
}

const OnDevAlert: React.FC<Props> = ({ trigger }) => {
  return (
    <>
      <IonAlert
        trigger={trigger}
        header="开发中……"
        subHeader="敬请期待！"
        message="如果能提PR当然更好"
        buttons={['OK']}
      ></IonAlert>
    </>
  )
}

export default OnDevAlert;