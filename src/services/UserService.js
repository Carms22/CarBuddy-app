import createHttp from "./BaseService";

const http = createHttp(true);

export const getCurrentUser = () => 
http.get("/users/me").then((res) => res);

export const getUsers = () => 
  http.get("/users").then((res) => res);

export const getListYourJourneys = () => 
  http.get("/creators/journeys").then((res) => res);

export const getDetail = (id) => 
  http.get(`/users/${id}`).then((res) => res);


// export const updateUser = (id, body) =>
//   http.post(`/users/${id}`, body).then((res) => res);

// export const deleteUser = (id) =>
//   http.post(`/users/${id}/delete`).then((res) => res);""

export const getCreator = (id) => 
  http.get(`/creators/${id}`).then((res) => res);