import request from ".";

export const login = async (studentId: string, password: string) => {
  const response = await request.post<any>("/user/login/password", { studentId, password });
  return response.data;
};

export const linkLogin = async (code: string, type: number = 2) => {
  let data = new FormData();
  data.append('code', code);
  data.append('type', type.toString());
  const response = await request.post<any>("/user/login/link", data, {
    headers: { "Content-Type": "multipart/form-data;" }
  });
  return response.data;
}