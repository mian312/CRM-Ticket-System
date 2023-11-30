import {
  fetchTicketLoading,
  fetchTicketSuccess,
  fetchTicketFail,
  searchTickets,
} from "./ticketsSlice";

import { getAllTickets } from "../../api/TicketApi";
import { Dispatch } from "redux";

export const fetchAllTickets = () => async (dispatch: Dispatch) => {
  dispatch(fetchTicketLoading());
  try {
    const result: any = await getAllTickets();
    dispatch(fetchTicketSuccess(result.data.result));
  } catch (error: any) {
    dispatch(fetchTicketFail(error.message));
  }
};

export const filterSearchTicket = (str: string) => (dispatch: Dispatch): void => {
  dispatch(searchTickets(str));
};
