import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {addBooking}  from  "../store/actions/booking";
import { Booking } from "../types";
import { isValidDates, overlaps } from "../utils";
import {TextField, Button, makeStyles, Typography} from "@material-ui/core";

interface Props {
  existingBookings: Booking[];
  addBooking: (booking: Booking) => void;
  onDone : () => void
}

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },
    form: {
        display: "flex",
        flexDirection: "column"
    },
    input: {
        marginBottom: theme.spacing(2)
    },
    button: {
        marginTop: theme.spacing(2)
    }
}));

const BookingForm: React.FC<Props> = ({ existingBookings, addBooking,onDone }) => {
    const classes = useStyles();
  const [name, setName] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (start === end) {
      setError("oops!...Start date and end Date cannot be the same");
      return;
    }

    if(!isValidDates(start,end)){
      setError("oops!...Start date cannot be later than end date ,Please confirm booking");
      return;
    }

    const newBooking: Booking = {
      id: Date.now().toString(),
      name,
      startDate: start,
      endDate: end
    };

    if (overlaps(newBooking, existingBookings)) {
      setError("oops!...Booking overlaps with an existing booking");
      return;
    }

    addBooking(newBooking);
    onDone()
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
        <Typography style={{fontFamily:'san-serif',fontSize:24}}>Create a booking</Typography>
        <TextField
            className={classes.input}
            label="Name"
            value={name}
            variant="outlined"
            required
            onChange={(event) => setName(event.target.value)}
        />
        <TextField
            className={classes.input}
            label="Start Date"
            value={start}
            type="date"
            variant="outlined"
            required
            onChange={(event) => setStart(event.target.value)}
        />
        <TextField
            className={classes.input}
            label="End Date"
            value={end}
            type="date"
            variant="outlined"
            required
            onChange={(event) => setEnd(event.target.value)}
        />
        <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
        >
            Book
        </Button>
      <p style={{ color: "red" }}>{error}</p>
    </form>
  );
};

const mapStateToProps = (state: any) => ({
  existingBookings: state.bookings
});

const mapDispatchToProps = {
  addBooking
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);
