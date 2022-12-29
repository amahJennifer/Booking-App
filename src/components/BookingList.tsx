import React, { useEffect, useState } from "react";
import { connect,useDispatch } from "react-redux";
import { Booking } from "../types";
import EditBookingModal from "./EditBookingModal";
import {Button} from "@material-ui/core";
import {deleteBooking} from "../store/actions/booking";
import {Typography,Box} from "@material-ui/core";

interface Props {
  bookings: Booking[];
}

const BookingList: React.FC<Props> = ({ bookings }) => {
  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);
  const [selectedBooking,setSelectedBooking] = useState<Booking | null>(null)
  const [showEditModal,setShowEditModal] = useState<boolean>(false)

  useEffect(() => {
    if (bookings) {
      setExistingBookings(bookings);
      setShowEditModal(false)
    }
  }, [bookings]);

const dispatch = useDispatch()

  const handleEditBooking = (booking: Booking): void => {
    setSelectedBooking(booking)
    setShowEditModal(true)
  };

  const handleDeleteBooking = (bookingId:string):void =>{
    dispatch(deleteBooking(bookingId))
  }
  const handleCloseEditModal =(): void =>{
    setShowEditModal(false)
  }

  return (
    <div>
      {existingBookings.length < 1 ? (
        <Typography> no bookings</Typography>
      ) : (
        <div>
          <Typography>All Bookings</Typography>
          {existingBookings.map((booking) => (
            <Box style={{background:"white",maxWidth:'95%',margin:'auto'}} key={booking.id}>
              <p>
                {" "}
                {`${booking.name} made a reservation from ${booking.startDate} to ${booking.endDate}`}
              </p>
              <Button variant={'outlined'} onClick={() => handleEditBooking(booking)}>Edit booking</Button>
              <Button variant={'outlined'} onClick={() => handleDeleteBooking(booking.id)}>Delete booking</Button>
            </Box>
          ))}
          <EditBookingModal booking={selectedBooking} isOpen={showEditModal} onClose={handleCloseEditModal}/>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  bookings: state.bookings
});

export default connect(mapStateToProps)(BookingList);
