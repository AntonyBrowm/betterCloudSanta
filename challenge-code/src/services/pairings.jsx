import axios from 'axios';

const baseURL = 'http://localhost:5000'; // Cambia la URL según tu configuración

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${baseURL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
};

export const generateNewSantaGift = async (id_participant1, id_participant2) => {
  try {
    const response = await axios.post(`${baseURL}/pairings`, { id_participant1, id_participant2 });
    return response.data;
  } catch (error) {
    console.error('Error generating new Santa gift exchange:', error);
    throw error;
  }
};

export const getSantaAssignments = async () => {
  try {
    const response = await axios.get(`${baseURL}/santa_exchange`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Santa gift assignments:', error);
    throw error;
  }
};