import axios from "axios";

const getAllComments = async (token : string) => {
  try {
    const response = await axios.get('https://redrice-backend-go.onrender.com/api/v1/comments', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
    } catch (error) {
    console.error('Get all comments error:', error);
    throw error;
    }
}

export { getAllComments };
