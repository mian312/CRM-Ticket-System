import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
    isLoading: boolean;
    isAuth: boolean;
    error: string;
}

const initialState: LoginState = {
    isLoading: false,
    isAuth: false,
    error: "",
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginPending: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state) => {
            state.isLoading = false;
            state.isAuth = true;
            state.error = "";
        },
        loginFail: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

const { reducer, actions } = loginSlice;

export const { loginPending, loginSuccess, loginFail } = actions;

export default reducer;
