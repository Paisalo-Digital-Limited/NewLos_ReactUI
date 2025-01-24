import axios from 'axios';

// Replace with your base API URL
const API_URL = 'https://apiuat.paisalo.in:4015/fi/api/FiSanction';

export const updateFisanctionAmt = async (obj) => {
  try {
    const payload = {
      ficode: obj.ficode,
      Creator: obj.Creator,
      Code: obj.Code,
      SmCode: obj.SmCode,
      Amount: obj.Amount,
      Type: obj.Type,
      FileName: obj.FileName,
      FileContent: obj.FileContent,
      SanctionedDate: obj.SanctionedDate,
      StartDate: obj.StartDate,
      NextDueDate: obj.NextDueDate,
      NextPVNRcpDate: obj.NextPVNRcpDate,
      Install: obj.Install,
      FI_Id: obj.FI_Id,
    };

    const response = await axios.post(`${API_URL}/UpdateSanctionAmtAfter`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is successful
    if (!response.data) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.data; // return the response data if successful
  } catch (error) {
    console.error('Error in updateFisanctionAmt:', error);
    throw error;
  }
};

export const getFIData = async (FICode, Creator) => {
  try {
    const response = await axios.get(`${API_URL}/GetFiData`, {
      params: {
        FiCode: FICode,
        Creator: Creator,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching FI data:', error);
    throw error;
  }
};

export const getSanctionAmtApi = async (Fi_Id) => {
  try {
    const response = await axios.get(`${API_URL}/GetSanctionAmount`, {
      params: {
        Fi_Id: Fi_Id,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sanction amount:', error);
    throw error;
  }
};

export const updateSanctionAmtApi = async (Fi_Id, Amount) => {
  try {
    const response = await axios.post(`${API_URL}/UpdateFiSanctionAmount`, {
      Fi_Id: Fi_Id,
      Amount: Amount,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating sanction amount:', error);
    throw error;
  }
};

export const getFiData = async (FICode, Creator) => {
  try {
    const response = await axios.get(`${API_URL}/GetFiData`, {
      params: {
        FiCode: FICode,
        Creator: Creator,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching FI data:', error);
    throw error;
  }
};

export const updateLoanAmtBefore = async (FICode, Amount, creator) => {
  try {
    const response = await axios.post(`${API_URL}/UpdateSanctionAmtbefore`, {
      FICode,
      Amount,
      creator,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating loan amount:', error);
    throw error;
  }
};

export const updateModificationDate = async (ficode, creator, sanctionedDate, startDate) => {
  try {
    const response = await axios.post(
      `${API_URL}/FiSanctionedUpdateDate`,
      null, // No body needed
      {
        params: {
          ficode: ficode,
          creator: creator,
          SanctionedDate: sanctionedDate,
          StartDate: startDate,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error updating modification date:', error);
    throw error;
  }
};

export const deleteSanctionAmtApi = async (Fi_Id) => {
  try {
    const response = await axios.get(`${API_URL}/DeleteFiSanctionAmount`, {
      params: {
        Fi_Id: Fi_Id,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting sanction amount:', error);
    throw error;
  }
};