import { Booking } from "./types";

export const overlaps = (booking: Booking, existingBookings: Booking[]) => {
  return existingBookings.some((b) => {
    return (
      (booking.startDate >= b.startDate && booking.startDate < b.endDate) ||
      (booking.endDate > b.startDate && booking.endDate <= b.endDate)
    );
  });
};

export const isValidDates = (startDate:string,endDate:string) =>{
  const start = new Date(startDate);
  const end = new Date(endDate);
  //if start date is lesser or earlier than end date then the date
  // range is valid
  return start < end
}
