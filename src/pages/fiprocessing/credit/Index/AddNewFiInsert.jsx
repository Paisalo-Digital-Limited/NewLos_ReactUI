import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
//import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included
//import './App.css'; // Optional for custom styles

const AddNewFiModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newFiCode, setNewFiCode] = useState('');

  // Function to handle adding the new Fi
  const AddNewFiInsert = () => {
    // Your saving logic here
    console.log('New Fi is being saved:', { newFiCode });
    // Reset the input field
    setNewFiCode('');
    // Close the modal after saving
    setModalOpen(false);
  };

  return (
    <div>
      <Button 
        color="primary" 
        sx={{ fontSize: { xs: '20px', md: '24px' } }} 
        onClick={() => setModalOpen(true)}
      >
        <AddCircleOutline />
      </Button>

      {modalOpen && (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header m-2">
                <h5 className="modal-title">Add New Fi</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setModalOpen(false)} 
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input type="hidden" id="Id" name="Id" value="" />
                    <label className="form-label">FiCode</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      id="Ficode" 
                      name="Ficode" 
                      value="" 
                      disabled 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="hidden" id="Id" name="Id" value="" />
                    <label className="form-label">Creator</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      id="Creator" 
                      name="Creator" 
                      value="" 
                      disabled 
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">New FiCode</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      id="NewFiCode" 
                      name="NewFiCode" 
                      value={newFiCode} 
                      onChange={(e) => setNewFiCode(e.target.value)} // Update state on input change
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  id="btnedit" 
                  onClick={AddNewFiInsert}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewFiModal;