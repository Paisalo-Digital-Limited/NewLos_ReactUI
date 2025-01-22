// handleGetCrif.js
import Swal from 'sweetalert2';

// Function to convert base64 to Blob
const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

// Function to fetch CRIF report
const getCrif = async (ficode, creator) => {
  const response = await fetch(`https://apiuat.paisalo.in:4015/fi/api/FIIndex/GetCrif?ficode=${ficode}&creator=${creator}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

const handleGetCrif = async (code, creator) => {
  try {
    const response = await getCrif(code, creator);
    const { statuscode, message, data } = response;

    if (statuscode === 200) {
      const blob = b64toBlob(data, 'application/pdf');
      const blobUrl = URL.createObjectURL(blob);

      // Initiate download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'CrifReport.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Open PDF in new tab
      window.open(blobUrl, '_blank');

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'CRIF Report Generated',
        text: message || 'The CRIF report has been successfully generated.',
        confirmButtonText: 'OK'
      });
    } else if (statuscode === 201) {
      Swal.fire({
        icon: 'info',
        title: 'No Data Found',
        text: message || 'No CRIF data available for the provided inputs.',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message || 'An unexpected error occurred.',
        confirmButtonText: 'OK'
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Request Failed',
      text: 'An error occurred while fetching the CRIF report.',
      confirmButtonText: 'OK'
    });
  }
};

export default handleGetCrif;
