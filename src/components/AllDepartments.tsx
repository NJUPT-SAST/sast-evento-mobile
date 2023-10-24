import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllDepartments } from '../apis/user';
import { Department } from '../context';
import { IonContent, IonItem, IonLabel, IonList } from '@ionic/react';

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

  // TODO get square img/ico and change layout into grid
  return (
    <div className='allDepartmentsWarpper'>
      <IonList>
        {departments.map(department => (
          <IonItem key={department.id} onClick={() => handleDepartmentClick(department.id)}>
            <IonLabel>{department.departmentName}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </div>
  );
}

export default AllDepartments;
