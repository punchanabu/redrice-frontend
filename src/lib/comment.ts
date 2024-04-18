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
            `https://redrice-backend-go.onrender.com/api/v1/comments`,
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