import { useState, useEffect } from 'react';
import { getAllDepartments } from '../apis/user';
import { Department } from '../context';
import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRow, IonSkeletonText, IonThumbnail, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';

import './AllDepartments.scss'
import DepartmentIcon from '../components/DepartmentIcon';

function AllDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);

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

  if (departments.length === 0 || departments === null) {

    return (
      <IonPage>
        <IonHeader translucent={false}>
          <IonToolbar>
            <IonTitle>分类</IonTitle>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow key="departmentRow0">
              {Array.from({ length: 3 }, (_, i) => (
                <IonCol key={i} size="4">
                  <IonItem lines='none' style={{"--background": "none"}}>
                    <IonThumbnail style={{"--border-radius": "5px", "--size": "70px", "margin": "8px auto 0px auto"}}>
                      <IonSkeletonText animated={true}></IonSkeletonText>
                    </IonThumbnail>
                  </IonItem>
                  <IonItem lines='none' style={{"--background": "none"}}>
                    <IonLabel>
                      <p>
                        <IonSkeletonText animated={true}></IonSkeletonText>
                      </p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    )
  }

  return (
    <IonPage>
      <IonHeader translucent={false}>
        <IonToolbar>
          <IonTitle>分类</IonTitle>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
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
