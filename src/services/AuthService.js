import createHttp from "./BaseService";

const http = createHttp(false);

export const userLogin = (data) => http.post("/login", data);

export const createUser = (body) =>
  http.post("/users", body).then((res) => res);