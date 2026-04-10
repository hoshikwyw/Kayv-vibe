import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./services/PlayerSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});
