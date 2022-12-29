import { Booking } from "../../src/types";

enum ActionTypes {
  ADD_BOOKING = "ADD_BOOKING",
  REMOVE_BOOKING = "REMOVE_BOOKING",
  UPDATE_BOOKING = "UPDATE_BOOKING",
  GET_BOOKING = "GET_BOOKING",
  DELETE_BOOKING = 'DELETE_BOOKING'
}

interface AddBookingAction {
  type: ActionTypes.ADD_BOOKING ;
  payload: Booking;
}

interface UpdateBookingAction {
  type: ActionTypes.UPDATE_BOOKING;
  payload: {booking:Booking,id:string};
}

interface RemoveBookingAction {
  type: ActionTypes.REMOVE_BOOKING;
  payload: string;
}

interface GetBookingAction {
  type: ActionTypes.GET_BOOKING;
  payload: string;
}

interface DeleteBookingAction {
  type: ActionTypes.DELETE_BOOKING;
  payload: string;
}


type BookingAction = AddBookingAction | RemoveBookingAction | GetBookingAction | UpdateBookingAction | DeleteBookingAction;

const initialState: Booking[] = [];

function bookingsReducer(state = initialState, action: BookingAction) {
  switch (action.type) {
    case ActionTypes.ADD_BOOKING:
      return [...state, action.payload];
    case ActionTypes.REMOVE_BOOKING:
      return state.filter((booking) => booking.id !== action.payload);
    case ActionTypes.UPDATE_BOOKING:
      return state.map((booking)=>{
        if(booking.id=== action.payload.id){
          const {startDate,endDate,name} = action.payload.booking
          return {
            ...booking,
            startDate,
            endDate,
            name
          }
        }
        return booking
      })
    case ActionTypes.GET_BOOKING:
      return state.filter((booking) => booking.id === action.payload);
    case ActionTypes.DELETE_BOOKING:
      return state.filter((booking) => booking.id !== action.payload);
    default:
      return state;
  }
}

export default bookingsReducer;
