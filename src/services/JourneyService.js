import createHttp from "./BaseService";

const http = createHttp(true);

//all journeys
export const getJourneys = () => 
  http.get("/journeys").then( res => res );

//detail
export const getJourneyDetail = (id) => 
  http.get(`/journeys/${id}`).then( res => res);

//creator's journeys
export const getListByCreator = (id) => 
  http.get(`/journeys/${id}/creator`).then( res => res);

//create a journey
export const postJourney = (body) => 
  http.post("/journeys", body).then( res => res);

//Edite a journey
export const updateJourney = (id, body) => 
  http.post(`/journeys/${id}/edit`, body).then( res => res);

//Delete a journey
export const deleteJourney = (id) => 
  http.delete(`/journeys/${id}`).then( res => res);

//Create a comment
export const postComment = (id,body) => 
  http.post(`/comments/${id}`, body).then( res => res);

//Rating
export const postScore = (id, body) => 
  http.post(`/scores/${id}`, body).then(res => res);

export const getScore = (id) => 
  http.get(`/scores/${id}`).then( res => res)