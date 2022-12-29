import { Booking } from "../../types";

export const addBooking = (booking: Booking) => ({
  type: "ADD_BOOKING",
  payload: booking
});

export const getBooking = (bookingId: string) => ({
  type: "GET_BOOKING",
  payload: bookingId
});

export const updateBooking = (booking: Booking,id:string) => ({
  type: "UPDATE_BOOKING",
  payload: {booking,id}
});

export const deleteBooking = (bookingId: string) => ({
  type: "DELETE_BOOKING",
  payload: bookingId
});
