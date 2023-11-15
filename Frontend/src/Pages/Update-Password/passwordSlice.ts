import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PasswordResetState {
    isLoading: boolean;
    status: string;
    message: string;
    showUpdatePassForm: boolean;
    input: string;
}

const initialState: PasswordResetState = {
    isLoading: false,
    status: "",
    message: "",
    showUpdatePassForm: false,
    input: "",
};

const passwordReset = createSlice({
    name: "passwordReset",
    initialState,
    reducers: {
        otpReqPending: (state) => {
            state.isLoading = true;
        },
        otpReqSuccess: (
            state,
            action: PayloadAction<{ message: string; input: string }>
        ) => {
            state.isLoading = false;
            state.status = "success";
            state.message = action.payload.message;
            state.input = action.payload.input;
            state.showUpdatePassForm = true;
        },
        updatePassSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.status = "success";
            state.message = action.payload;
            // state.showOtpForm = false;
        },
        otpReqFail: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.status = "error";
            state.message = action.payload;
        },
    },
});

export const {
    otpReqPending,
    otpReqSuccess,
    otpReqFail,
    updatePassSuccess,
} = passwordReset.actions;

export default passwordReset.reducer;
