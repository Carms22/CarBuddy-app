import createHttp from "./BaseService";

const http = createHttp(true);

export const getJourneys = () => 
  http.get("/journeys").then( res => res );

export const getJourneyDetail = (id) => 
  http.get(`/journeys/${id}`).then( res => res);

export const postJourney = (body) => 
  http.post("/journeys", body).then( res => res);