export interface Event {
  departments: Department[];
  description: string;
  eventType: EventType;
  gmtEventEnd: string;
  gmtEventStart: string;
  gmtRegistrationEnd: string;
  gmtRegistrationStart: string;
  id: number;
  location: string;
  state: number;
  tag: string;
  title: string;
  [property: string]: any;
}

export interface Department {
  departmentName: string;
  id: number;
  [property: string]: any;
}

export interface EventType {
  allowConflict: boolean;
  id: number;
  typeName: string;
  [property: string]: any;
}

export interface UserInfo {
  avatar: string;
  biography: string;
  email: string;
  id: string;
  link: Array<string[]>;
  linkId: string;
  nickname: string;
  organization: string;
  studentId: string;
  [property: string]: any;
}