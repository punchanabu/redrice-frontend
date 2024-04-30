import axios from 'axios';
import { convertTimeToISO } from '@/utils/dateConverter';

export interface createCommentRequest {
    rating: number;
    myComment: string;
    restaurantId: number;
}

export const createCommentAndRating = async (
    token: string,
    commentRequest: createCommentRequest
) => {
    try {
        
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments`,
            {
                ...commentRequest
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Comment error:', error);
        throw error;
    }
};