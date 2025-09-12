import { configureStore } from "@reduxjs/toolkit";
import { fetchCities, shazamApi } from "./services/dataFetch";
import playerReducer from "./services/PlayerSlice";

export const store = configureStore({
  reducer: {
    [shazamApi.reducerPath]: shazamApi.reducer,
    [fetchCities.reducerPath]: fetchCities.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamApi.middleware, fetchCities.middleware),
});
