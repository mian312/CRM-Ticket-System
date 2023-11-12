import {
    fetchSingleTicketLoading,
    fetchSingleTicketSuccess,
    fetchSingleTicketFail,
} from "./singleTicketSlice"; // Assuming you've appropriately named your singleTicketSlice file

import { getSingleTicket } from "../../api/TicketApi"; // Assuming an API for single ticket exists
import { Dispatch } from "redux";

export const fetchSingleTicket = (_id: string) => async (dispatch: Dispatch) => {
    dispatch(fetchSingleTicketLoading());
    try {
        const result: any = await getSingleTicket(_id);
        dispatch(fetchSingleTicketSuccess(result.data.result[0]));
    } catch (error: any) {
        dispatch(fetchSingleTicketFail(error.message));
    }
};
