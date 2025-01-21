import apiClient from '../network/apiClient';

export const insertGuarantorApi = async (formData) => {
  try {
    console.log('API Request Data:', formData);
    const response = await apiClient.post('https://localhost:7030/api/FiGuaranter/InsertGuarantor', formData, {
      //  const response = await apiClient.post('https://apiuat.paisalo.in:4015/fi/api/FiGuaranter/InsertGuarantor', formData, {

      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};
