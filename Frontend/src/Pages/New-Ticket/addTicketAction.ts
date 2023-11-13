import {
    openNewTicketPending,
    openNewTicketSuccess,
    openNewTicketFail,
} from "./addTicketSlice";
import { createNewTicket } from "../../api/TicketApi";
import { Dispatch } from "@reduxjs/toolkit";

export const openNewTicket = (frmData: object) => async (dispatch: Dispatch) => {
    try {
        dispatch(openNewTicketPending());

        const result: any = await createNewTicket(frmData);
        if (result.status === "error") {
            return dispatch(openNewTicketFail(result.message));
        }
        dispatch(openNewTicketSuccess(result.message));
    } catch (error: any) {
        dispatch(openNewTicketFail(error.message));
    }
};