import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  user: null, 
  exchangeInfo: null, 
};

const rootReducer = (state = initialState, action) => {
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
