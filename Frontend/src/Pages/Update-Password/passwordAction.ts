import {
    otpReqPending,
    otpReqSuccess,
    otpReqFail,
    updatePassSuccess,
} from "./passwordSlice";

import { reqPasswordOtp, updateUserPassword } from "../../api/UserApi";
import { Dispatch } from "@reduxjs/toolkit";

export const sendPasswordResetOtp = (input: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(otpReqPending());

        const result: any = await reqPasswordOtp(input);

        const message = result.message;

        if (result.status === "success") {
            return dispatch(otpReqSuccess({ message, input }));
        }

        dispatch(otpReqFail(result.message));
    } catch (error: any) {
        dispatch(otpReqFail(error.message));
    }
};

export const updatePassword = (frmData: object) => async (dispatch: Dispatch) => {
    try {
        dispatch(otpReqPending());

        const result: any = await updateUserPassword(frmData);

        if (result.status === "success") {
            return dispatch(updatePassSuccess(result.message));
        }

        dispatch(otpReqFail(result.message));
    } catch (error: any) {
        dispatch(otpReqFail(error.message));
    }
};