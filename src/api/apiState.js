import apiClient from '../network/apiClient';

/**
 * Fetches the state master data from the API.
 * @returns {Promise<Array>} An array of states.
 */
export const fetchStatesApi = async () => {
  try {
    const response = await apiClient.get('https://apiuat.paisalo.in:4015/fi/api/Masters/GetStateMaster');
    const { statuscode, data } = response.data;

    if (statuscode === 200) {
      return data;
    } else {
      throw new Error(`Failed to fetch states. Status code: ${statuscode}`);
    }
  } catch (error) {
    console.error('Error fetching states:', error);
    throw error;
  }
};