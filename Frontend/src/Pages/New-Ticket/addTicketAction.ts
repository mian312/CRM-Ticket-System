import {
    openNewTicketPending,
    openNewTicketSuccess,
    openNewTicketFail,
    searchNewTicketPending,
    searchNewTicketFail,
    getStationPending,
    getStationFail,
    getStationSuccess,
    getTrainsPending,
    getTrainsFail,
    getTrainsSuccess,
} from "./addTicketSlice";
import { createNewTicket } from "../../api/TicketApi";
import { Dispatch } from "@reduxjs/toolkit";
import { fetchStations, fetchTrains } from "../../api/TrainApi";

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

export const searcStations = (query: string, limit: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(getStationPending())

        const result: any = await fetchStations(query, limit);

        if (result?.errors) {
            dispatch(getStationFail(result.errors.title))
        } else {
            dispatch(getStationSuccess(result.data))
        }
    } catch (error: any) {
        dispatch(getStationFail(error.message))
    }
}

export const getTrains = (sourceStation: string,
    destinationStation: string,
    date: string) => async (dispatch: Dispatch) => {
        try {
            dispatch(getTrainsPending())

            const result: any = await fetchTrains(sourceStation, destinationStation, date);

            if (result?.errors) {
                dispatch(getTrainsFail(result.errors.title))
            } else {
                dispatch(getTrainsSuccess(result.data))
            }
        } catch (error: any) {
            dispatch(getTrainsFail(error.message))
        }
    }