import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewTicketState {
    isLoading: boolean;
    error: string;
    successMsg: string;
    stationsLoading: boolean;
    stations: any;
    station: string;
    trainsLoading: boolean;
    trains: any[];
}

const initialState: NewTicketState = {
    isLoading: false,
    error: "",
    successMsg: "",
    stationsLoading: false,
    stations: [],
    station: "",
    trainsLoading: false,
    trains: [],
};

const newTicketSlice = createSlice({
    name: "newTicket",
    initialState,
    reducers: {
        openNewTicketPending: (state) => {
            state.isLoading = true;
        },
        openNewTicketSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.successMsg = action.payload;
        },
        openNewTicketFail: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        searchNewTicketPending: (state) => {
            state.trainsLoading = true;
        },
        searchNewTicketSuccess: (state, action: PayloadAction<string>) => {
            state.trainsLoading = false;
            state.successMsg = action.payload;
        },
        searchNewTicketFail: (state, action: PayloadAction<string>) => {
            state.trainsLoading = false;
            state.error = action.payload;
        },
        getStationPending: (state) => {
            state.stationsLoading = true;
        },
        getStationSuccess: (state, action: PayloadAction<string>) => {
            state.stationsLoading = false;
            state.stations = action.payload;
        },
        getStationFail: (state, action: PayloadAction<string>) => {
            state.stationsLoading = false;
            state.stations = action.payload;
        },
        getTrainsPending: (state) => {
            state.trainsLoading = true;
        },
        getTrainsSuccess: (state, action: PayloadAction<any[]>) => {
            state.trainsLoading = false;
            state.trains = action.payload;
        },
        getTrainsFail: (state, action: PayloadAction<string>) => {
            state.trainsLoading = false;
            state.trains = [];
            state.error = action.payload;
        }
    },
});

export const {
    openNewTicketPending,
    openNewTicketSuccess,
    openNewTicketFail,
    searchNewTicketPending,
    searchNewTicketSuccess,
    searchNewTicketFail,
    getStationPending,
    getStationSuccess,
    getStationFail,
    getTrainsPending,
    getTrainsSuccess,
    getTrainsFail,
} = newTicketSlice.actions;
export default newTicketSlice.reducer;
