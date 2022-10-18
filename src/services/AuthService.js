import createHttp from "./BaseService";

const http = createHttp();

export const userLogin = (data) => 
  http.post("/login", data).then((res)=>res)

export const createUser = (body) =>
  http.post("/users", body).then((res) => res);