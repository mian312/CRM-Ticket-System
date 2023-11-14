import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserRegistrationState {
    isLoading: boolean;
    status: string;
    message: string;
}

const initialState: UserRegistrationState = {
    isLoading: false,
    status: "",
    message: "",
};

const userRegistrationSlice = createSlice({
    name: "userRegistration",
    initialState,
    reducers: {
        registrationPending: (state) => {
            state.isLoading = true;
        },
        registrationSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.status = "success";
            state.message = action.payload;
        },
        registrationError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.status = "error";
            state.message = action.payload;
        },
    },
});

export const {
    registrationPending,
    registrationSuccess,
    registrationError,
} = userRegistrationSlice.actions;

export default userRegistrationSlice.reducer;
