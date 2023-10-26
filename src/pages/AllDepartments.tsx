import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllDepartments } from '../apis/user';
import { Department } from '../context';
import { IonBackButton, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';

import './AllDepartments.scss'

function AllDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const history = useHistory();

  useEffect(() => {
    getAllDepartments().then((res) => {
      setDepartments(res);
      localStorage.setItem('departments', JSON.stringify(res));
    })
  }, []);

  function handleDepartmentClick(id: number) {
    history.push(`/department/${id}`, { departmentName: departments.find((department) => department.id === id)?.departmentName });
  }

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const departmentsGrid = () => {
    const rowCount = Math.ceil(departments.length / 3);
    return (
      <IonGrid>
        {Array.from({ length: rowCount }, (_, i) => (
          <IonRow key={i}>
            {departments.slice(i * 3, (i !== rowCount - 1) ? (i * 3 + 3) : departments.length).map((department) => (
              <IonCol key={department.id} size="4">
                <div className='departmentsWarpper' onClick={() => handleDepartmentClick(department.id)}>
                  <div className='departmentIcon' style={{ backgroundColor: getRandomColor()}}>{department.departmentName[0]}</div>
                  <IonLabel>{department.departmentName}</IonLabel>
                </div>
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
