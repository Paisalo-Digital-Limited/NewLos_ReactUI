// actionConfigurations.js
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';
import CloneStatusDialog from './CloneStatusDialog';

const fId = '10057';
const DbNamevalue = 'PDLERP';

export const useActions = () => {
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [cloneData, setCloneData] = useState(null);

  const handleAccountOpening = async () => {
    setLoading(true);
    const HouseVisitVM = {
      F_Id: fId,
      Type: 'AppliactionForm',
      DbName: DbNamevalue
    };

    try {
      const response = await axios.post('https://apiuat.paisalo.in:4015/PDLDocReports/api/DocGen/GetDocument', HouseVisitVM);
      const { code, data } = response.data;
      if (code === 200) {
        const pdfFilePath = data;
        const fileName = pdfFilePath.split(':').pop();
        const pdfUrl = `https://predeptest.paisalo.in:8084/${fileName}`;
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      } else if (code === 201) {
        Swal.fire('No Data Found', '', 'info');
      } else {
        Swal.fire('Error', 'An unexpected error occurred.', 'error');
      }
    } catch (error) {
      console.error('Error fetching the report:', error);
      Swal.fire('Request Failed', 'An error occurred while fetching the report.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLoanAgreement = async () => {
    setLoading(true);
    const HouseVisitVM = {
      F_Id: fId,
      Type: 'SecondeSign',
      DbName: DbNamevalue
    };

    try {
      const response = await axios.post('https://apiuat.paisalo.in:4015/PDLDocReports/api/DocGen/GetDocument', HouseVisitVM);
      const { code, data } = response.data;
      if (code === 200) {
        const pdfFilePath = data;
        const fileName = pdfFilePath.split(':').pop();
        const pdfUrl = `https://predeptest.paisalo.in:8084/${fileName}`;
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      } else if (code === 201) {
        Swal.fire('No Data Found', '', 'info');
      } else {
        Swal.fire('Error', 'An unexpected error occurred.', 'error');
      }
    } catch (error) {
      console.error('Error fetching the report:', error);
      Swal.fire('Request Failed', 'An error occurred while fetching the report.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleHouseVisit = async () => {
    setLoading(true);
    const HouseVisitVM = {
      F_Id: fId,
      Type: 'HouseVisit',
      DbName: DbNamevalue
    };

    try {
      const response = await axios.post('https://apiuat.paisalo.in:4015/PDLDocReports/api/DocGen/GetDocument', HouseVisitVM);
      const { code, data } = response.data;
      if (code === 200) {
        const pdfFilePath = data;
        const fileName = pdfFilePath.split(':').pop();
        const pdfUrl = `https://predeptest.paisalo.in:8084/${fileName}`;
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      } else if (code === 201) {
        Swal.fire('No Data Found', '', 'info');
      } else {
        Swal.fire('Error', 'An unexpected error occurred.', 'error');
      }
    } catch (error) {
      console.error('Error fetching the report:', error);
      Swal.fire('Request Failed', 'An error occurred while fetching the report.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePronote = async () => {
    setLoading(true);
    const HouseVisitVM = {
      F_Id: fId,
      Type: 'Pronote',
      DbName: DbNamevalue
    };

    try {
      const response = await axios.post('https://apiuat.paisalo.in:4015/PDLDocReports/api/DocGen/GetDocument', HouseVisitVM);
      const { code, message, data } = response.data;
      if (code === 200) {
        const pdfFilePath = data;
        const fileName = pdfFilePath.split(':').pop();
        const pdfUrl = `https://predeptest.paisalo.in:8084/${fileName}`;
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      } else if (code === 201) {
        Swal.fire('No Data Found', message || 'No data available for the provided inputs.', 'info');
      } else {
        Swal.fire('Error', message || 'An unexpected error occurred.', 'error');
      }
    } catch (error) {
      console.error('Error fetching the report:', error);
      Swal.fire('Request Failed', 'An error occurred while fetching the PDF report.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchCloneStatus = async () => {
    try {
      const response = await axios.get('https://apiuat.paisalo.in:4015/fi/api/FIIndex/GetCloneStatus?Code=250004&Creator=BAREILLY');
      if (response.data.statuscode === 200) {
        // Handle successful clone status retrieval, for example, updating state or showing a dialog
        Swal.fire('Clone Status', JSON.stringify(response.data.data), 'info');
      } else {
        console.error('Error fetching clone status:', response.data.message);
        Swal.fire('Error', response.data.message, 'error');
      }
    } catch (error) {
      console.error('Error fetching clone status:', error);
      Swal.fire('Error', 'Failed to fetch clone status.', 'error');
    }
  };

  const InitilizeCrif = async (ficode, creator) => {
    try {
      const response = await axios.post(`https://apiuat.paisalo.in:4015/fi/api/FIIndex/InitilizeCrif?ficode=${ficode}&creator=${creator}`);

      if (response.status === 200) {
        const message = response.data.data[0]?.Msg; // Optional chaining to avoid errors

        if (message) {
          Swal.fire({
            title: 'Notification',
            text: message,
            icon: 'info'
          });
        } else {
          Swal.fire({
            title: 'Success',
            text: response.data.message,
            icon: 'success'
          });
        }
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.message,
          icon: 'error'
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong!',
        icon: 'error'
      });
    }
  };

  const actionConfigurations = [
    { label: 'Account Opening', icon: '🔍', color: '#1976d2', id: 'account-opening-btn', onClick: handleAccountOpening },
    { label: 'Loan Agreement', icon: '📄', color: '#d32f2f', id: 'loan-agreement-btn', onClick: handleLoanAgreement },
    { label: 'House Visit', icon: '🏠', color: '#2d7830', id: 'house-visit-btn', onClick: handleHouseVisit },
    { label: 'Get Crif', icon: '✔️', color: '#22d4e6', id: 'get-crif-btn', onClick: () => handleGetCrif('261863', 'BAREILLY') },
    { label: 'Generate', icon: '⚙️', color: '#1976d2', id: 'generate-btn', onClick: () => InitilizeCrif('261863', 'BAREILLY') },
    { label: 'Promote', icon: '📈', color: '#43a047', id: 'promote-btn', onClick: handlePronote },
    { label: 'Clone Status', icon: '📋', color: '#e67e22', id: 'clone-status-btn', onClick: fetchCloneStatus }
    // Add other actions as needed
  ];
  <CloneStatusDialog open={openPopup} onClose={() => setOpenPopup(false)} cloneData={cloneData} />;
  return { actionConfigurations, loading };
};
