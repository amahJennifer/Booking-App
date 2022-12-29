import { useState, useEffect } from "react";
import BookingList from "../components/BookingList";
import BookingForm from "../components/BookingForm";
import { useSelector } from "react-redux";
import {Button, Typography} from "@material-ui/core";

const Home = () => {
  const [showBookingForm, setShowBookingForm] = useState<boolean>(false);

  const handleShowBookingForm = (): void => {
    setShowBookingForm((prev) => !prev);
  };

  const allBookings = useSelector((state: any) => state.bookings);

  const handleBookingComplete =()=>{
    setShowBookingForm(false)
  }
  useEffect(() => {
    if (allBookings && showBookingForm) {
      setShowBookingForm(false);
    }
  }, [allBookings]);


  return (
    <div>
      <div>
        <Typography style={{fontSize:40,marginBottom:40}}>
          Hostfully
        </Typography>
      </div>
      {!showBookingForm && (
        <Button variant="contained" color="primary" onClick={handleShowBookingForm}>Create Booking</Button>
      )}

      <div>
        {showBookingForm ? (
          <>
            <BookingForm onDone={handleBookingComplete} />{" "}
            <Button variant="contained" color="primary" onClick={() => setShowBookingForm((prev) => !prev)}>
              View Bookings
            </Button>{" "}
          </>
        ) : (
          <BookingList />
        )}
      </div>
    </div>
  );
};

export default Home;
