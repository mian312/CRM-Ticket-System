import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SingleTicketState {
    selectedTicket: any; // Define the appropriate structure for a single ticket
    isLoading: boolean;
    error: string;
    replyMsg: string; // Added for handling reply messages
}

const initialState: SingleTicketState = {
    selectedTicket: null, // Adjust based on your ticket structure
    isLoading: false,
    error: "",
    replyMsg: "", // Initial state for reply messages
};

const singleTicketSlice = createSlice({
    name: "singleTicket",
    initialState,
    reducers: {
        fetchSingleTicketLoading: (state) => {
            state.isLoading = true;
        },
        fetchSingleTicketSuccess: (state, action: PayloadAction<any>) => {
            state.selectedTicket = action.payload;
            state.isLoading = false;
            state.error = "";
        },
        fetchSingleTicketFail: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        replyTicketLoading: (state) => {
            state.isLoading = true;
        },
        replyTicketSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = "";
            state.replyMsg = action.payload;
        },
        replyTicketFail: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        closeTicketLoading: (state) => {
            state.isLoading = true;
        },
        closeTicketSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = "";
            state.replyMsg = action.payload;
        },
        closeTicketFail: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

const { reducer, actions } = singleTicketSlice;

export const {
    fetchSingleTicketLoading,
    fetchSingleTicketSuccess,
    fetchSingleTicketFail,
    replyTicketLoading,
    replyTicketSuccess,
    replyTicketFail,
    closeTicketLoading,
    closeTicketSuccess,
    closeTicketFail,
} = actions;

export default reducer;
