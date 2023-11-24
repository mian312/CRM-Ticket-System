import axios, { AxiosResponse } from 'axios';

// API URL
const apiUrl = 'https://railway.zennozenith.com/api/v1/';

export const fetchTrains = async (
    sourceStation: string,
    destinationStation: string,
    date: string
): Promise<any[]> => {
    const endpoint = 'trainsBtwStations';

    const params = {
        fromStation: sourceStation,
        toStation: destinationStation,
        date: date,
    };

    try {
        const response: AxiosResponse<any[]> = await axios.get<any[]>(`${apiUrl}${endpoint}`, { params });
        // Handle the API response here
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle errors here
        console.error('Error fetching trains:', error);
        throw error;
    }
};

export const fetchStations = async (query: string, limit: number): Promise<any[]> => {
    const endpoint = 'stations';

    const params = {
        q: query,
        limit: limit,
    };

    try {
        const response: AxiosResponse<any[]> = await axios.get<any[]>(`${apiUrl}${endpoint}`, { params });
        // Handle the API response here
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle errors here
        console.error('Error fetching stations:', error);
        throw error;
    }
};

// Example usage:
// const trains = await fetchTrains('HWH', 'NDLS', '2023-11-20');
// const stations = await fetchStations('query', 10);
