import { useHistory } from "react-router-dom";
import { Department } from "../context";
import { IonLabel } from "@ionic/react";
import "./DepartmentIcon.scss";

const DepartmentIcon = ({ department }: any) => {
  const history = useHistory();

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  function handleDepartmentClick(id: number) {
    history.push(`/department/${id}`, { departmentName: department.departmentName });
  }

  return (
    <div className='departmentsWarpper' onClick={() => handleDepartmentClick(department.id)}>
      <div className='departmentIcon' style={{ backgroundColor: getRandomColor() }}>{department.departmentName[0]}</div>
      <IonLabel>{department.departmentName}</IonLabel>
    </div>
  )
}

export default DepartmentIcon;