import axios from 'axios';

const getOneRestaurant = async (id: string, token: string) => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurants/${id}`,
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
        console.error('Get restaurant by ID error:', error);
        throw error;
    }
};

const getAllRestaurant = async (token: string) => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurants`,
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

const createRestaurant = async (formData: FormData, token: string) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurants`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error creating restaurant:', error);
        throw error;
    }
};

const updateRestaurant = async (
    id: string,
    formData: FormData,
    token: string
) => {
    try {
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurants/${id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Failed to update restaurant:', error);
        throw error;
    }
};

const deleteRestaurant = async (id: string, token: string) => {
    try {
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurants/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        throw error;
    }
};

const getRestaurantById = async (id: string, token: string) => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurants/${id}`,
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
        console.error('Get restaurant by id error:', error);
    }
};

export {
    getAllRestaurant,
    createRestaurant,
    updateRestaurant,
    getRestaurantById,
    deleteRestaurant,
    getOneRestaurant,
};
