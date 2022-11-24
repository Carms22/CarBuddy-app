import createHttp from "./BaseService";

const http = createHttp(false);

export const getJourneysFromSearch = (data) => 
  http.get("/searchs",  {params: {lng: data[0], lat: data[1]}}).then( res => res);

// export const postPayment = (data) => 
//   createHttp(true).post(`/payment`, data).then( res => res);