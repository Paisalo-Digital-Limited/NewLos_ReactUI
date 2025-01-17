
// with Pop Up for document view 
import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  Link,
  Grid,
  Card,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Description,
  AccountBox,
  Fingerprint,
  Folder,
} from "@mui/icons-material";

// Document details with icons
const documentDetails = [
  { docName: "Document Application Form Front", icon: <Description /> },
  { docName: "Document Application Form Back", icon: <AccountBox /> },
  { docName: "Group Loan Application Front", icon: <AccountBox /> },
  { docName: "Borrower Aadhar", icon: <Fingerprint /> },
  { docName: "Borrower Bank Passbook", icon: <Folder /> },
  { docName: "Voter ID Borrower", icon: <Fingerprint /> },
  { docName: "Signed Disbursement Sheet", icon: <AccountBox /> },
  { docName: "Pronote", icon: <Description /> },
  { docName: "CAM", icon: <AccountBox /> },
  { docName: "End Use Certificate", icon: <AccountBox /> },
  { docName: "Aadhar ID Back", icon: <Fingerprint /> },
];

// Static documents for loading state
const staticDocuments = documentDetails.map((detail, index) => ({
  id: `${index + 1}`,
  name: detail.docName,
  docID: index + 1,
  docName: detail.docName,
  checklistId: null,
  docData: null,
  docFilePath: null,
  dc: 0,
  createdDate: null,
  filePath: null,
  grNo: 0,
  icon: detail.icon,
}));

const Rightsidebar = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('borrower');
  const [openModal, setOpenModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        
        // Fetching documents from API
        const response = await fetch('https://apiuat.paisalo.in:4015/fi/api/FIIndex/GetAllDoc?creator=BAREILLY&ficode=261863');
        const data = await response.json();

        if (data.statuscode === 200) {
          // Merging static documents and fetched documents
          const mergedDocuments = data.data.map((doc) => ({
            ...doc,
            icon: doc.icon || <Description />,
          }));

          // Filter documents based on `grNo`
          const borrowerDocuments = mergedDocuments.filter((doc) => doc.grNo <= 0);
          const coBorrowerDocuments = mergedDocuments.filter((doc) => doc.grNo > 0);

          // Set documents based on selected type
          setDocuments(selectedType === 'borrower' ? borrowerDocuments : coBorrowerDocuments);
        } else {
          console.error('Error fetching documents:', data.message);
        }
      } catch (error) {
        console.error("Failed to fetch documents", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [selectedType]);

  // Function to get sorted documents
  const getSortedDocuments = () => {
    return [...documents].sort((a, b) => {
      if (a.filePath && !b.filePath) return -1;
      if (!a.filePath && b.filePath) return 1;
      return 0;
    });
  };

  // Handle opening the modal
  const handleOpenModal = (doc) => {
    setSelectedDocument(doc);
    setOpenModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDocument(null);
  };

  return (
    <Grid item xs={12} md={3} style={{ marginBottom: '1rem' }}>
      <Card variant="outlined" sx={{ height: { xs: "400px", sm: "500px", md: "550px" }, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Tabs
          value={selectedType}
          onChange={(event, newValue) => setSelectedType(newValue)}
          textColor="primary"
          indicatorColor="primary"
          sx={{ mb: 1 }}
        >
          <Tab label="Borrower Documents" value="borrower" />
          <Tab label="Co-Borrower Documents" value="co-borrower" />
        </Tabs>
        <Box sx={{ flexGrow: 1, overflowY: "auto", padding: '10px' }}>
          <List>
            {loading ? (
              staticDocuments.map((doc, index) => (
                <ListItem key={index} divider>
                  <ListItemIcon sx={{ color: "black", minWidth: "40px" }}>
                    {doc.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={doc.docName}
                    secondary={<CircularProgress size={16} />}
                  />
                </ListItem>
              ))
            ) : (
              getSortedDocuments().length > 0 ? (
                getSortedDocuments().map((doc, index) => {
                  const pdfUrl = doc.filePath ? `https://predeptest.paisalo.in:8084${doc.filePath.split(':').pop()}` : null;
                  return (
                    <ListItem key={index} divider>
                      <ListItemIcon sx={{ color: doc.filePath ? "green" : "red", minWidth: "40px" }}>
                        {doc.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          doc.filePath ? (
                            <Link
                              onClick={() => handleOpenModal(doc)}
                              sx={{ cursor: "pointer", color: "green", textDecoration: "underline", fontWeight:'bold' }}
                            >
                              {doc.docName}
                            </Link>
                          ) : (
                            doc.docName
                          )
                        }
                        secondary={doc.docFilePath ? `File Path: ${doc.docFilePath}` : "File not available"}
                      />
                    </ListItem>
                  );
                })
              ) : (
                <ListItem>
                  <ListItemText primary="No documents found." />
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Card>

      {/* Modal to display PDF */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedDocument?.docName}</DialogTitle>
        <DialogContent>
          {/* If there's a PDF URL, display it in an iframe */}
          {selectedDocument?.filePath && (
            <iframe
              src={`https://predeptest.paisalo.in:8084${selectedDocument.filePath.split(':').pop()}`}
              style={{ width: '100%', height: '500px', border: 'none' }}
              title="Document Preview"
            />
          )}
          {!selectedDocument?.filePath && <p>File not available to view.</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Rightsidebar;
