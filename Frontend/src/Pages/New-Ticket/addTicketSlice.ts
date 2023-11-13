import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewTicketState {
    isLoading: boolean;
    error: string;
    successMsg: string;
}

const initialState: NewTicketState = {
    isLoading: false,
    error: "",
    successMsg: "",
};

const newTicketSlice = createSlice({
    name: "newTicket",
    initialState,
    reducers: {
        openNewTicketPending: (state) => {
            state.isLoading = true;
        },
        openNewTicketSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.successMsg = action.payload;
        },
        openNewTicketFail: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    openNewTicketPending,
    openNewTicketSuccess,
    openNewTicketFail,
} = newTicketSlice.actions;
export default newTicketSlice.reducer;
