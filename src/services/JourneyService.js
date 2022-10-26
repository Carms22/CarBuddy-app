import createHttp from "./BaseService";

const http = createHttp(true);

export const getJourneys = () => 
  http.get("/journeys").then( res => res );

export const getJourneyDetail = (id) => 
  http.get(`/journeys/${id}`).then( res => res);

export const postJourney = (body) => 
  http.post("/journeys", body).then( res => res);

export const postComment = (id,body) => 
  http.post(`/comments/${id}`, body).then( res => res);

export const postScore = (id, body) => 
  http.post(`/scores/${id}`, body).then(res => res);