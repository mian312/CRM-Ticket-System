import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    user: Record<string, any>;
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    user: {},
    isLoading: false,
    error: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUserPending: (state) => {
            state.isLoading = true;
        },
        getUserSuccess: (state, action: PayloadAction<Record<string, any>>) => {
            state.isLoading = false;
            state.user = action.payload;
            state.error = "";
        },
        getUserFail: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getUserPending,
    getUserSuccess,
    getUserFail,
} = userSlice.actions;

export default userSlice.reducer;
