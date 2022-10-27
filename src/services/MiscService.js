import createHttp from "./BaseService";

const http = createHttp(false);

export const postLatLong = (data) => 
  http.post("/searchs",  data).then( res => res);