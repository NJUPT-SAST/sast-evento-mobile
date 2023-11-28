import { useEffect, useState } from "react";
import { Department } from "../context";
import { getAllDepartments, getSubscribeDepartments } from "../apis/user";
import DepartmentIcon from "./DepartmentIcon";
import "./SubscribeDepartments.scss";
import { useRefreshStore } from "../util/refresh";

const SubscribedDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>(localStorage.getItem('subscribeDepartments') === null ? [] : JSON.parse(String(localStorage.getItem('subscribeDepartments'))));
  const refreshStore = useRefreshStore();

  useEffect(() => {
    getSubscribeDepartments().then((res) => {
      refreshStore.setIsSubscribedDepartmentRefresh(false);
      setDepartments(res);
      localStorage.setItem('subscribeDepartments', JSON.stringify(res));
    });
  }, [refreshStore.isSubscribedDepartmentRefresh]);

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