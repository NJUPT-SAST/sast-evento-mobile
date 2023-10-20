import request from '.';
import { Event } from '../context';

export const getAllConductingEvent = async () => {
  const response = await request.get<Event[]>('/event/conducting');
  return response.data;
};

export const getEventList = async (page: number, size: number = 5) => {
  const response = await request.get<any>('/event/list', { params: { page, size } });
  return response.data;
};
