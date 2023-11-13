import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./Pages/Ticket-Listing/ticketsSlice";
import loginReducer from "./Pages/Entry/loginSlice";
import userReducer from "./Pages/Dashboard/userSlice";
import singleTicketReducer from "./Pages/View-Ticket/singleTicketSlice";
import newTicketReducer from "./Pages/New-Ticket/addTicketSlice";

// Define the root state type (you should adjust this to match your actual state)
// type RootState = ReturnType<typeof store.getState>;

// Create the Redux store
const store = configureStore({
    reducer: {
        tickets: ticketsReducer,
        login: loginReducer,
        user: userReducer,
        singleTicket: singleTicketReducer,
        openTicket: newTicketReducer,
    },
});

export default store;
