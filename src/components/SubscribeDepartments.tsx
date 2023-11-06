import { useEffect, useState } from "react";
import { Department } from "../context";
import { getAllDepartments, getSubscribeDepartments } from "../apis/user";
import DepartmentIcon from "./DepartmentIcon";
import "./SubscribeDepartments.scss";

const SubscribedDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>(localStorage.getItem('subscribeDepartments') === null ? [] : JSON.parse(String(localStorage.getItem('subscribeDepartments'))));

  useEffect(() => {
    getSubscribeDepartments().then((res) => {
      setDepartments(res);
      localStorage.setItem('subscribeDepartments', JSON.stringify(res));
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