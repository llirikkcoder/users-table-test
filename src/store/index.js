import { configureStore } from "@reduxjs/toolkit";
import companiesSlice from "../store/slices/companySlice";
import humanSlice from "../store/slices/humanSlice";
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    companies: companiesSlice,
    humans: humanSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
