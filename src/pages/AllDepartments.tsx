import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllDepartments } from '../apis/user';
import { Department } from '../context';
import { IonBackButton, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';

import './AllDepartments.scss'
import DepartmentIcon from '../components/DepartmentIcon';

function AllDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const history = useHistory();

  useEffect(() => {
    getAllDepartments().then((res) => {
      setDepartments(res);
      localStorage.setItem('departments', JSON.stringify(res));
    })
  }, []);

  const departmentsGrid = () => {
    const rowCount = Math.ceil(departments.length / 3);
    return (
      <IonGrid>
        {Array.from({ length: rowCount }, (_, i) => (
          <IonRow key={i}>
            {departments.slice(i * 3, (i !== rowCount - 1) ? (i * 3 + 3) : departments.length).map((department) => (
              <IonCol key={department.id} size="4">
                <DepartmentIcon department={department}></DepartmentIcon>
              </IonCol>))}
          </IonRow>
        ))}
      </IonGrid>
    )
  }

  const close = () => {
    history.push(`/home`, { direction: 'back' });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>分类</IonTitle>
          <IonButton slot="start" fill="clear" size='small' onClick={close}>
            <IonBackButton></IonBackButton>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} >
        <div className='allDepartmentsWarpper'>
          {departmentsGrid()}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default AllDepartments;
