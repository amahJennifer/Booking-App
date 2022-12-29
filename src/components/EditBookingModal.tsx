import React, { useState ,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {makeStyles, Typography} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Booking} from "../types";
import {isValidDates, overlaps} from "../utils";
import {updateBooking} from "../store/actions/booking";

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

interface Props {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}


const EditBookingModal: React.FC<Props> = ({booking,isOpen,onClose}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedBooking,setSelectedBooking] = useState<Booking | null>(null)
  const [end,setEnd] = useState<string>('')
  const [start,setStart] = useState<string>('')
  const [name,setName] = useState<string>('')
  const [error,setError] = useState<string>('')

  const existingBookings:Booking[] = useSelector((state: { bookings:Booking[] }) => state.bookings)

  const handleClose = () => {
    onClose()
  };

  const dispatch = useDispatch()

  useEffect(()=>{
    if(booking) {
      setSelectedBooking(booking)
      setEnd(booking?.endDate)
      setName(booking?.name)
      setStart(booking?.startDate)
    }
  },[booking])

  useEffect(()=>{
    setOpen(isOpen)
  },[isOpen])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(selectedBooking){

      if (start === end) {
        setError("oops!...Start date and end Date cannot be the same");
        return;
      }

      if(!isValidDates(start,end)){
        setError("oops!...Start date cannot be later than end date ,Please confirm booking");
        return;
      }

      const updatedBooking: Booking = {
        id: selectedBooking?.id,
        name,
        startDate: start,
        endDate: end
      };

      const filterExistingBookings = existingBookings.filter(booking=>booking.id !== updatedBooking.id)

      if (overlaps(updatedBooking, filterExistingBookings)) {
        setError("oops!...Booking overlaps with an existing booking");
        return;
      }
      dispatch(updateBooking(updatedBooking,updatedBooking.id));
      setOpen(false)
    }

  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  return (
    <div>
      <Modal
        aria-labelledby="form-modal-title"
        aria-describedby="form-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <h2 id="form-modal-title">Edit Booking </h2>
          <form className={classes.form} onSubmit={handleSubmit}>
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
            <Typography color={'error'}>{error}</Typography>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditBookingModal;


