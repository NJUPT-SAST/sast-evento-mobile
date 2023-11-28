import request from ".";

export const login = async (studentId: string, password: string) => {
  const response = await request.post<any>("/user/login/password", { studentId, password });
  return response.data;
};

export const logout = async () => {
  const response = await request.post<any>("/user/logout");
  return response.data;
}

export const linkLogin = async (code: string, type: number = 2) => {
  let data = new FormData();
  data.append('code', code);
  data.append('type', type.toString());
  const response = await request.post<any>("/user/login/link", data, {
    headers: { "Content-Type": "multipart/form-data;" }
  });
  return response.data;
}

export const getLoginKey = async (studentId: string) => {
  const response = await request.get<any>('/user/login/key', { params: { studentId } });
  return response.data;
}

export const pwLogin = async (studentId: string, password: string) => {
  let data = new FormData();
  data.append('studentId', studentId);
  data.append('password', password);
  const response = await request.post<any>('/user/login/password', data, {
    headers: { "Content-Type": "multipart/form-data;" }
  });
  return response.data;
}