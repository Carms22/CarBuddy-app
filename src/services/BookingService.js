import createHttp from "./BaseService";
const http = createHttp(true);

export const postBooking = (id, body) => 
  http.post(`/bookings/${id}`, body).then(res => res)

export const getBookingsJourney = (id) => 
  http.get(`/bookings/${id}`).then(res => res)

export const getBookings = () => {
  return http.get('/bookings').then(res => res)
}