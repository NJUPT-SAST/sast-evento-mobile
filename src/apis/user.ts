import request from '.';
import { Department, Event } from '../context';

export const getAllConductingEvent = async () => {
  const response = await request.get<Event[]>('/event/conducting');
  return response.data;
};

export const getEventList = async (page: number, size: number = 5) => {
  const response = await request.get<any>('/event/list', { params: { page, size } });
  return response.data;
};

export const getEventInfo = async (eventId: number) => {
  const response = await request.get<Event>('/event/info', { params: { eventId } });
  return response.data;
}

export const getUserParticipant = async (eventId: number) => {
  const response = await request.get<any>('/user/participate', { params: { eventId } });
  return response.data;
}

export const getAllDepartments = async () => {
  const response = await request.get<Department[]>('/event/departments');
  return response.data;
}

export const getEventWithFilter = async (typeId: string = '', departmentId: string = '', time: string = '') => {
  let data = new FormData();
  data.append('typeId', typeId.toString());
  data.append('departmentId', departmentId.toString());
  data.append('time', time.toString());
  const response = await request.post<Event[]>('/event/list', data);
  return response.data;
}

export const getHomeSlideList = async () => {
  const response = await request.get<any>('/slide/home/list');
  return response.data;
}