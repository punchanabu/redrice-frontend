import axios from 'axios';

const getAllResvation = async (token: string) => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservations`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const { data } = response;
        return data;
    } catch (error) {
        console.error('Get all restaurant error:', error);
    }
};

const getReservationByIdUser = async (token: string,id:string) => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}/reservations`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const { data } = response;
        return data;
    } catch (error) {
        console.error('Get all restaurant error:', error);
    }
};


import { convertTimeToISO } from '@/utils/dateConverter';

export interface createReservationRequest {
    dateTime: string;
    restaurantId: number;
    tableNum: number;
    exitTime: string;
}

const createReservation = async (
    token: string,
    reservationRequest: createReservationRequest
) => {
    try {
        
        const dateTimeISO = convertTimeToISO(reservationRequest.dateTime);
        const exitTimeISO = convertTimeToISO(reservationRequest.exitTime);
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservations`,
            {
                ...reservationRequest,
                dateTime: dateTimeISO,
                exitTime: exitTimeISO,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Reservation error:', error);
        throw error;
    }
};

const getMyReservations = async (token: string) => {
    try {
        const user = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        
        const id = user.data.ID;
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}/reservations`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Get my reservations error:', error);
        throw error;
    }
};

const deleteReservation = async (token: string, reservationId: number) => {
    try {
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservations/${reservationId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Delete reservation error:', error);
        throw error;
    }
};

const updateReservation = async (token: string, id: string, dateTime: any, tableNum: number, exitTime: any) => {
    try {

        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservations/${id}`,
            {
                dateTime: convertTimeToISO(dateTime),
                tableNum: tableNum,
                exitTime: convertTimeToISO(exitTime),
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Update reservation error:', error);
        throw error;
    }
}

const getReservation = async (token: string, id: string) => {
    try {
        const response = await axios.get(
            `${process.env.BACKEND_URL}/reservations/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Get reservation error:', error);
        throw error;
    }
}
export { createReservation, getMyReservations, deleteReservation, getAllResvation, getReservationByIdUser, updateReservation, getReservation};
