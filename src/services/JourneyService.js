import createHttp from "./BaseService";

//const http = createHttp(true);

export const getJourneys = () => 
  createHttp().get("/journeys").then( res => res );

export const getJourneyDetail = (id) => 
  createHttp().get(`/journeys/${id}`).then( res => res);

export const postJourney = (body) => 
  createHttp().post("/journeys").then( res => res);