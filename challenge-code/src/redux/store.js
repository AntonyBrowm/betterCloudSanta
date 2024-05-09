import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Store logged-in user information
  exchangeInfo: null, // Store current Secret Santa exchange details (year, participants, etc.)
};

const rootReducer = (state = initialState, action) => {
  // Add reducer logic to handle actions that update state
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_EXCHANGE_INFO':
      return { ...state, exchangeInfo: action.payload };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
