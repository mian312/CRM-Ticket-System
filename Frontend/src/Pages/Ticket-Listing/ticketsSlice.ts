import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state interface
interface TicketListState {
    tickets: any[];
    isLoading: boolean;
    error: string;
    searchTicketList: any[];
}

// Initialize the initial state
const initialState: TicketListState = {
    tickets: [],
    isLoading: false,
    error: "",
    searchTicketList: [],
};

// Create a ticketListSlice using createSlice
const ticketListSlice = createSlice({
    name: "ticketList",
    initialState,
    reducers: {
        // Reducer for setting loading state
        fetchTicketLoading: (state) => {
            state.isLoading = true;
        },
        // Reducer for successful ticket fetch
        fetchTicketSuccess: (state, action: PayloadAction<any[]>) => {
            state.tickets = action.payload;
            state.searchTicketList = action.payload;
            state.isLoading = false;
        },
        // Reducer for failed ticket fetch
        fetchTicketFail: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // Reducer for searching tickets
        searchTickets: (state, action: PayloadAction<string>) => {
            state.searchTicketList = state.tickets.filter((row) => {
                if (!action.payload) return true; // Return true to include all if no search string.

                return row.subject.toLowerCase().includes(action.payload.toLowerCase());
            });
        },
    },
});

// Extract reducer and actions
const { reducer, actions } = ticketListSlice;

// Export individual actions
export const {
    fetchTicketLoading,
    fetchTicketSuccess,
    fetchTicketFail,
    searchTickets,
} = actions;

export default reducer;
