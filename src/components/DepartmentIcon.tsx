import { useHistory } from "react-router-dom";
import { Department } from "../context";
import { IonLabel } from "@ionic/react";
import "./DepartmentIcon.scss";

const DepartmentIcon = ({ department }: any) => {
  const history = useHistory();

  function str2color(str: string) {
    if (str === null || str.length <= 2) {
      return "000000";
    }
    let hexResult = '7';
    hexResult += str.charCodeAt(0).toString(16);
    hexResult += 'f';
    hexResult += str.charCodeAt(2).toString(16);
    const output = hexResult;
    return output.substring(0, 6);
  }

  const getRandomColor = (name: string) => {
    const color = str2color(name);
    // add # and transparent
    return "#" + color + "70";
  };

  function handleDepartmentClick(id: number) {
    history.push(`/department/${id}`, { departmentName: department.departmentName });
  }

  return (
    <div className='departmentsWarpper' onClick={() => handleDepartmentClick(department.id)}>
      <div className='departmentIcon' style={{ backgroundColor: getRandomColor(department.departmentName) }}>{department.departmentName[0]}</div>
      <IonLabel>{department.departmentName}</IonLabel>
    </div>
  )
}

export default DepartmentIcon;