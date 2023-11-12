import {
    fetchSingleTicketLoading,
    fetchSingleTicketSuccess,
    fetchSingleTicketFail,
    replyTicketLoading,
    replyTicketFail,
    replyTicketSuccess,
} from "./singleTicketSlice"; // Assuming you've appropriately named your singleTicketSlice file

import { getSingleTicket, updateReplyTicket } from "../../api/TicketApi"; // Assuming an API for single ticket exists
import { Dispatch } from "redux";

export const fetchSingleTicket = (_id: string) => async (dispatch: Dispatch) => {
    dispatch(fetchSingleTicketLoading());
    try {
        const result: any = await getSingleTicket(_id);
        dispatch(
            fetchSingleTicketSuccess(
                result.data.result.length && result.data.result[0]
            )
        );
    } catch (error: any) {
        dispatch(fetchSingleTicketFail(error.message));
    }
};

export const replyOnTicket = (_id: string, msgObj: object) => async (dispatch: Dispatch) => {
    dispatch(replyTicketLoading());
    try {
        const result: any = await updateReplyTicket(_id, msgObj);
        console.log(result);
        if (result.status === "error") {
            return dispatch(replyTicketFail(result.message));
        }

        dispatch(fetchSingleTicket(_id));

        dispatch(replyTicketSuccess(result.message));
    } catch (error: any) {
        console.log(error.message);
        dispatch(replyTicketFail(error.message));
    }
};
