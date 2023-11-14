import {
    registrationPending,
    registrationSuccess,
    registrationError,
} from "./userRegestrationSlice";
import { userRegistration } from "../../api/UserApi";
import { Dispatch } from 'redux';

export const newUserRegistration = (frmDt: object) => async (dispatch: Dispatch) => {
    try {
        dispatch(registrationPending());

        const result: any = await userRegistration(frmDt);
        result.status === "error"
            ? dispatch(registrationError(result.message))
            : dispatch(registrationSuccess(result.message));

        console.log(result);
    } catch (error: any) {
        dispatch(registrationError(error.message));
    }
};