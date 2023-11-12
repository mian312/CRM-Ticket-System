import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state interface for singleTicketSlice
interface SingleTicketState {
    selectedTicket: any[];
    isLoading: boolean;
    error: string;
}

// Initialize the initial state for singleTicketSlice
const initialState: SingleTicketState = {
    selectedTicket: [],
    isLoading: false,
    error: "",
};

// Create a singleTicketSlice using createSlice
const singleTicketSlice = createSlice({
    name: "singleTicket",
    initialState,
    reducers: {
        // Reducer for setting loading state
        fetchSingleTicketLoading: (state) => {
            state.isLoading = true;
        },
        // Reducer for successful single ticket fetch
        fetchSingleTicketSuccess: (state, action: PayloadAction<any>) => {
            state.selectedTicket = action.payload;
            state.isLoading = false;
            state.error = "";
        },
        // Reducer for failed single ticket fetch
        fetchSingleTicketFail: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

// Extract reducer and actions
const { reducer, actions } = singleTicketSlice;

// Export individual actions
export const {
    fetchSingleTicketLoading,
    fetchSingleTicketSuccess,
    fetchSingleTicketFail,
} = actions;

export default reducer;
