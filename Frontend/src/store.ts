import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./Pages/Ticket-Listing/ticketsSlice";
import loginReducer from "./Pages/Entry/loginSlice";

// Define the root state type (you should adjust this to match your actual state)
type RootState = ReturnType<typeof store.getState>;

// Create the Redux store
const store = configureStore({
    reducer: {
        tickets: ticketsReducer,
        login: loginReducer,
    },
});

export default store;
