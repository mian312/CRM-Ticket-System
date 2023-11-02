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
      const result: any = await getAllTickets(); // Using 'any' here, which bypasses TypeScript type checking
      dispatch(fetchTicketSuccess(result.data.result));
    } catch (error: any) { // Using 'any' here, which bypasses TypeScript type checking
      dispatch(fetchTicketFail(error.message));
    }
  };
  
  export const filterSearchTicket = (str: string) => (dispatch: Dispatch): void => {
    dispatch(searchTickets(str));
  };
  