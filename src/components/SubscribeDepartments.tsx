import { useEffect, useState } from "react";
import { Department } from "../context";
import { getAllDepartments, getSubscribeDepartments } from "../apis/user";
import DepartmentIcon from "./DepartmentIcon";
import "./SubscribeDepartments.scss";

const SubscribedDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>(localStorage.getItem('subscribeDepartments') === null ? [] : JSON.parse(String(localStorage.getItem('subscribeDepartments'))));
  // TODO: import zustand
  function arraysHaveSameElements(arr1: Array<any>, arr2: Array<any>) {
    return arr1.toString() === arr2.toString();
  }

  useEffect(() => {
    getSubscribeDepartments().then((res) => {
      if (res === null) {
        return;
      }
      if (!arraysHaveSameElements(res, departments)) {
        setDepartments(res);
        localStorage.setItem('subscribeDepartments', JSON.stringify(res));
      }
    });
  }, []);

  return (
    <div className="subscribeDepartmentsWarpper">
      {departments.map((department: Department) => {
        return (
          <div key={department.id}>
            <DepartmentIcon department={department}></DepartmentIcon>
          </div>
        )
      })}
    </div>
  )
}

export default SubscribedDepartments;