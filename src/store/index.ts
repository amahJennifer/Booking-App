import { createStore, combineReducers } from 'redux';
import bookingsReducer from './bookings';

const rootReducer = combineReducers({
  bookings: bookingsReducer
});

const store = createStore(rootReducer);

export default store;
