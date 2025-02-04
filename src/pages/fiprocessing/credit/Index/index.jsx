import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Avatar,
  Button,
  Card,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  MenuItem,DialogActions 
} from "@mui/material";
import {
  AccountBalance,
  Assignment,
  Home,
  AssignmentTurnedIn,
  Description,
  AccountCircle,
  Map,
  AttachMoney,
  FileCopy,
  Preview,
  Close
} from "@mui/icons-material";
// import { useActions } from './actionConfigurations';
import AnimateButton from "components/@extended/AnimateButton";
import ComponentSkeleton from "pages/component-overview/ComponentSkeleton";
import Details from "./details";
import SearchIcon from "@mui/icons-material/Search";
import RightSidebar from "./rightsidebar";
import CloneStatusDialog from "./CloneStatusDialog";
import handleGetCrif from "./handleGetCrif"; // Adjust the path as necessary
import axios from "axios";
import Swal from "sweetalert2";
import { fetchCreatorsApi } from "api/apiCreator";
import "./index.css";
import apiClient from "network/apiClient";



function LoanTrackerPage() {
  const [activeList, setActiveList] = useState("BORROWER");
  const [cloneData, setCloneData] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [creator, setCreator] = useState("");
  const [ficode, setFiCode] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState(null);
  const [smCode, setSMMCode] = useState("");
  const [newficode, setNewFiCode] = useState("");
  const [newcreator, setNewCreator] = useState("");
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [FiId, SetFiID] = useState("");
  const [FiCurrentStatus, SetFiCurrentStatus] = useState("");
  const [CrifDate, SetCrifDate] = useState("");

  const [pddDocCheck, setpddDocCheck] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [selectedDocPath, setSelectedDocPath] = useState(null);
  const [formData, setFormData] = useState({
    AREAS: "",
    Name: "",
    Approved: "",
    Tag: "",
    sourcingDate: "",
    currentStatus: "",
    schemeType: "",
    SmCode: "",
    percentage: "",
    fivPan_Name: "",
    fivAadhar_Name: "",
    fivBankAcc_Name: "",
    Bank_IFCS: "",
    Picture: "",
    FNAME: ""
  });

  // Set fixed values for F_Id and DbName
  //--------------Account Opening From--------
  const DbNamevalue = "PDLERP";
  const handleAccountOpening = async () => {
    setLoading(true);
    const HouseVisitVM = {
      F_Id: FiId,
      Type: "AppliactionForm",
      DbName: DbNamevalue
    };
    try {
      const response = await apiClient.post("PDLDocReports/api/DocGen/GetDocument", HouseVisitVM);
      const { code, message, data } = response.data;
      if (code === 200) {
        const pdfFilePath = data;
        const fileName = pdfFilePath.split(":").pop();
        const pdfUrl = `https://predeptest.paisalo.in:8084/${fileName}`;
        window.open(pdfUrl, "_blank", "noopener,noreferrer");
        handleAadharSehmati();
      } else if (code === 201) {
        Swal.fire({
          title: "No Record Found",
          text: response.data.message,
          icon: "info"
        });
      } else {
        Swal.fire({
          title: "error",
          text: response.data.message,
          icon: "error"
        });
      }
    } catch (error) {
      console.error("Error fetching the report:", error);
      alert("Request Failed");
    } finally {
      setLoading(false);
    }
  };
  //----------- AadharSehmati Form Download------------
  const handleAadharSehmati = async () => {
    setLoading(true);
    const HouseVisitVM = {
      F_Id: FiId,
      Type: "AadharSehmati",
      DbName: DbNamevalue
    };
    try {
      const response = await apiClient.post("PDLDocReports/api/DocGen/GetDocument", HouseVisitVM);
      const { code, message, data } = response.data;
      if (code === 200) {
        const pdfFilePath = data;
        const fileName = pdfFilePath.split(":").pop();
        const pdfUrl = `https://predeptest.paisalo.in:8084/${fileName}`;
        window.open(pdfUrl, "_blank", "noopener,noreferrer");
      } else if (code === 201) {
        Swal.fire({
          title: "No Record Found",
          text: response.data.message,
          icon: "info"
        });
      } else {
        Swal.fire({
          title: "error",
          text: response.data.message,
          icon: "error"
        });
      }
    } catch (error) {
      console.error("Error fetching the report:", error);
      alert("Request Failed");
    } finally {
      setLoading(false);
    }
  };
  //-----------Loan Aggrement Doc Second Esign Doc Download---------------
  const handleLoanAgreement = async () => {
    setLoading(true);
    const HouseVisitVM = {
      F_Id: FiId,
      Type: "SecondeSign",
      DbName: DbNamevalue
    };
    try {
      const response = await apiClient.post("PDLDocReports/api/DocGen/GetDocument", HouseVisitVM);
      const { code, message, data } = response.data;
      if (code === 200) {
        const pdfFilePath = data;
        const fileName = pdfFilePath.split(":").pop();
        const pdfUrl = `https://predeptest.paisalo.in:8084/${fileName}`;
        window.open(pdfUrl, "_blank", "noopener,noreferrer");
      } else if (code === 201) {
        Swal.fire({
          title: "No Record Found",
          text: response.data.message,
          icon: "info"
        });
      } else {
        Swal.fire({
          title: "error",
          text: response.data.message,
          icon: "error"
        });
      }
    } catch (error) {
      console.error("Error fetching the report:", error);
      alert("Request Failed");
    } finally {
      setLoading(false);
    }
  };
  //-----------House Visist Form Doc Download--------
  const handleHouseVisit = async () => {
    setLoading(true);
    const HouseVisitVM = {
      F_Id: FiId,
      Type: "HouseVisit",
      DbName: DbNamevalue
    };
    try {
      const response = await apiClient.post("PDLDocReports/api/DocGen/GetDocument", HouseVisitVM);
      const { code, message, data } = response.data;
      if (code === 200) {
        const pdfFilePath = data;
        const fileName = pdfFilePath.split(":").pop();
        const pdfUrl = `https://predeptest.paisalo.in:8084/${fileName}`;
        window.open(pdfUrl, "_blank", "noopener,noreferrer");
      } else if (code === 201) {
        Swal.fire({
          title: "No Record Found",
          text: response.data.message,
          icon: "info"
        });
      } else {
        Swal.fire({
          title: "error",
          text: response.data.message,
          icon: "error"
        });
      }
    } catch (error) {
      console.error("Error fetching the report:", error);
      alert("Request Failed");
    } finally {
      setLoading(false);
    }
  };
  //---------Pronote Doc Download-----
  const pronotetype = "Pronote";
  const handlePronote = async () => {
    setLoading(true);
    const HouseVisitVM = {
      F_Id: FiId,
      Type: pronotetype,
      DbName: DbNamevalue
    };
    try {
      //const response = await axios.post("https://apiuat.paisalo.in:4015/PDLDocReports/api/DocGen/GetDocument", HouseVisitVM);
      const response = await apiClient.post("PDLDocReports/api/DocGen/GetDocument", HouseVisitVM);
      const { code, message, data } = response.data;
      if (code === 200) {
        const pdfFilePath = data;
        const fileName = pdfFilePath.split(":").pop();
        const pdfUrl = `https://predeptest.paisalo.in:8084/${fileName}`;
        window.open(pdfUrl, "_blank", "noopener,noreferrer");
      } else if (code === 201) {
        Swal.fire({
          icon: "info",
          title: "No Data Found",
          text: message || "No data available for the provided inputs.",
          confirmButtonText: "OK"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: message || "An unexpected error occurred.",
          confirmButtonText: "OK"
        });
      }
    } catch (error) {
      console.error("Error fetching the report:", error);
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: "An error occurred while fetching the PDF report.",
        confirmButtonText: "OK"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleList = (list) => {
    setActiveList(list);
  };
  //-----------Generate Crif--------------
  const InitilizeCrif = async (ficode, creator) => {
    try {
      const response = await apiClient.post(`fi/api/FIIndex/InitilizeCrif?ficode=${ficode}&creator=${creator}`);
      if (response.status === 200) {
        debugger;
        if (response.data.statuscode == 200) {
          const message = response.data.message;
          if (message) {
            Swal.fire({
              icon: "success",
              title: "CRIF Report Generated",
              text: "The CRIF report has been successfully generated.",
              confirmButtonText: "OK"
            });
          }
        } else if (response.data.statuscode == 201) {
          const message = response.data.data[0]?.Msg;
          if (message) {
            Swal.fire({
              title: "Notification",
              text: message,
              icon: "info"
            });
          }
        } else {
          Swal.fire({
            title: "Success",
            text: response.data.message,
            icon: "success"
          });
        }
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message,
          icon: "error"
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong!",
        icon: "error"
      });
    }
  };

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const data = await fetchCreatorsApi();
        setCreators(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCreators();
  }, []);

  const HandleCrif = () => {
    const today = new Date();
    if (CrifDate != null) {
      const crifDateObj = new Date(CrifDate);
      if (isNaN(crifDateObj)) {
        return false;
      }
      const differenceMs = today - crifDateObj;
      const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
      if (differenceDays >= 30) {
        InitilizeCrif(ficode, creator);
      } else {
        handleGetCrif(ficode, creator);
      }
    } else {
      InitilizeCrif(ficode, creator);
    }
  };

  const handleSubmit = () => {
    Fetchdata();
    const startsWithVH = creator.startsWith("VH");
    if (startsWithVH == true) {
      setpddDocCheck(true);
    } else {
      setpddDocCheck(false);
    }
  };
  const Fetchdata = async () => {
    debugger;
    setNewFiCode(ficode);
    setNewCreator(creator);
    setSMMCode(smCode);

    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`fi/api/FIIndex/FiMasterData?ficode=${ficode}&creator=${creator}&smcode=${smCode}`);
      //const response = await apiClient.get(`http://localhost:7030/api/FIIndex/FiMasterData?ficode=${ficode}&creator=${creator}&smcode=${smCode}`);
      if (response.status === 200) {
        if (response.data.statuscode === 200) {
          const data = JSON.parse(response.data.data)[0];
          if (Array.isArray(data) && data.length > 0) {
            const firstItem = data[0]; // Get the first item
            // Set form data with the fetched item
            setFormData((prev) => ({ ...prev, ...firstItem }));
          }
          //setFormData(prev => ({ ...prev, ...data }));
          setFormData(data);
          SetFiID(data.ID);
          SetCrifDate(data.CrifDate);
          FiCurrentSatus(data.ID);
        } else if (response.data.statuscode === 201) {
          Swal.fire({
            title: "No Record Found",
            text: response.data.message,
            icon: "info"
          });
        }
      } else {
        Swal.fire({
          title: "No ReCord",
          text: response.data.message,
          icon: "error"
        });
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  //--------FiCurrent Satus--------------
  //   const FiCurrentSatus = async (FiId) => {
  //     debugger;
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const response = await apiClient.get(`fi/api/FIIndex/FiCurrentStatus?Id=${FiId}`);
  //       if (response.status === 200) {
  //         if (response.data.statuscode === 200) {
  //             debugger;
  //           const data = JSON.parse(response.data.data)[0];
  //           SetFiCurrentStatus(data);
  //         } else if (response.data.statuscode === 201) {
  //           Swal.fire({
  //             title: "No Record Found",
  //             text: response.data.message,
  //             icon: "info"
  //           });
  //         }
  //       } else {
  //         Swal.fire({
  //           title: "No ReCord",
  //           text: response.data.message,
  //           icon: "error"
  //         });
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       setError("Failed to fetch data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const FiCurrentSatus = async (FiId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`fi/api/FIIndex/FiCurrentStatus?Id=${FiId}`);

      // Check if the response status is OK
      if (response.status === 200) {
        if (response.data.statuscode === 200) {
          const data = JSON.parse(response.data.data)[0]; // Assuming data is an array here
          SetFiCurrentStatus(data);
          if (
            data.Sourcing != null &&
            data.FirstEsign == null &&
            data.Sanctioned == null &&
            data.SecondEsign == null &&
            data.Disbustment == null
          ) {
            const sourcingDate = new Date(data.Sourcing).toISOString().slice(0, 10); // Formatting to YYYY-MM-DD

            setFormData((prevData) => ({
              ...prevData,
              sourcingDate: sourcingDate,
              currentStatus: "Sourcing"
            }));
          } else if (
            data.Sourcing != null &&
            data.FirstEsign != null &&
            data.Sanctioned == null &&
            data.SecondEsign == null &&
            data.Disbustment == null
          ) {
            const sourcingDate = new Date(data.FirstEsign).toISOString().slice(0, 10);
            setFormData((prevData) => ({
              ...prevData,
              sourcingDate: sourcingDate,
              currentStatus: "FirstEsign"
            }));
          } else if (
            data.Sourcing != null &&
            data.FirstEsign != null &&
            data.Sanctioned != null &&
            data.SecondEsign == null &&
            data.Disbustment == null
          ) {
            const sourcingDate = new Date(data.Sanctioned).toISOString().slice(0, 10);
            setFormData((prevData) => ({
              ...prevData,
              sourcingDate: sourcingDate,
              currentStatus: "Sanctioned"
            }));
          } else if (
            data.Sourcing != null &&
            data.FirstEsign != null &&
            data.Sanctioned != null &&
            data.SecondEsign != null &&
            data.Disbustment == null
          ) {
            const sourcingDate = new Date(data.SecondEsign).toISOString().slice(0, 10);
            setFormData((prevData) => ({
              ...prevData,
              sourcingDate: sourcingDate,
              currentStatus: "SecondEsign"
            }));
          } else if (
            data.Sourcing != null &&
            data.FirstEsign != null &&
            data.Sanctioned != null &&
            data.SecondEsign != null &&
            data.Disbustment != null
          ) {
            const sourcingDate = new Date(data.Disbustment).toISOString().slice(0, 10);
            setFormData((prevData) => ({
              ...prevData,
              sourcingDate: sourcingDate,
              currentStatus: "Disbustment"
            }));
          }

          // You can also set any additional properties from `data` if needed, e.g.:
          // setSomeOtherState(data.SomeProperty);
        } else if (response.data.statuscode === 201) {
          Swal.fire({
            title: "No Record Found",
            text: response.data.message,
            icon: "info"
          });
        }
      } else {
        Swal.fire({
          title: "No Record",
          text: response.data.message,
          icon: "error"
        });
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const fetchCloneStatus = async () => {
    debugger;
    try {
      const response = await apiClient.get(`fi/api/FIIndex/GetCloneStatus?Code=${250069}&Creator=${creator}`);
      if (response.data.statuscode === 200) {
        setCloneData(response.data.data); // Assuming data is under response.data.data
        setOpenPopup(true); // Open dialog
      } else {
        console.error("Error fetching clone status:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching clone status:", error);
    }
  };

  const handleReadyToPush = async () => {
    try {
      const response = await axios.get(
        `https://apiuat.paisalo.in:4015/fi/api/FIIndex/CheckDocumentsAndReturnStatus?FiCode=${ficode}&Creator=${creator}`
      );
      if (response.status === 200) {
        const data = response.data;
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message,
          icon: "error"
        });
      }
    } catch (error) {
      console.error("Error fetching the document status:", error);
      Swal.fire({
        title: "Request Failed",
        text: "An error occurred while fetching the document status.",
        icon: "error"
      });
    }
  };

//   const handlePDDDocs = async () => {
//     debugger;
//     try {
//       const response = await apiClient.get(`fi/api/FIIndex/GetVehicleDocuments?FiCode=${250006}&Creator=${"BAREILLY"}`);
//       if (response.status === 200) {
//         Swal.fire({
//           title: "Documents Retrieved",
//           text: response.data.message,
//           icon: "success"
//         });
//       } else {
//         Swal.fire({
//           title: "Error",
//           text: response.data.message,
//           icon: "error"
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching vehicle documents:", error);
//       Swal.fire({
//         title: "Request Failed",
//         text: "An error occurred while retrieving vehicle documents.",
//         icon: "error"
//       });
//     }
//   };
  const handlePDDDocs = async () => {
    try {
        const response = await apiClient.get(`fi/api/FIIndex/GetVehicleDocuments?FiCode=${250006}&Creator=${"BAREILLY"}`);
        if (response.status === 200) {
            const data = JSON.parse(response.data.data); // Parse document data
            setDocuments(data); // Set documents to state
            setModalOpen(true); // Open modal
        } else {
            Swal.fire({
                title: 'Error',
                text: response.data.message,
                icon: 'error',
            });
        }
    } catch (error) {
        console.error('Error fetching vehicle documents:', error);
        Swal.fire({
            title: 'Request Failed',
            text: 'An error occurred while retrieving vehicle documents.',
            icon: 'error',
        });
    }
};
const handleDocumentClick = (filePath) => {
    // Constructing the PDF URL
    const pdfUrl = filePath ? `https://predeptest.paisalo.in:8084${filePath.split(':').pop()}` : null;
    setSelectedDocPath(pdfUrl); // Set the PDF URL for the iframe
};

  //     {
  //       label: "Account Opening",
  //       icon: <AccountBalance />,
  //       color: "#1976d2",
  //       id: "account-opening-btn",
  //       onClick: handleAccountOpening
  //     },
  //     {
  //       label: "Loan Agreement",
  //       icon: <Assignment />,
  //       color: "#d32f2f",
  //       id: "loan-agreement-btn",
  //       onClick: handleLoanAgreement
  //     },
  //     {
  //       label: "House Visit",
  //       icon: <Home />,
  //       color: "#2d7830",
  //       id: "house-visit-btn",
  //       onClick: handleHouseVisit
  //     },
  //     {
  //       label: "Get Crif",
  //       icon: <AssignmentTurnedIn />,
  //       color: "#22d4e6",
  //       id: "get-crif-btn",
  //       onClick: () => handleGetCrif("261863", "BAREILLY")
  //     },
  //     {
  //       label: "Generate",
  //       icon: <Description />,
  //       color: "#1976d2",
  //       id: "generate-btn",
  //       onClick: () => InitilizeCrif("261863", "BAREILLY")
  //     },
  //     {
  //       label: "Account Aggregator",
  //       icon: <AccountCircle />,
  //       color: "#d32f2f",
  //       id: "account-aggregator-btn"
  //     },
  //     {
  //       label: "Geo Tagging",
  //       icon: <Map />,
  //       color: "#0288d1",
  //       id: "geo-tagging-btn"
  //     },
  //     {
  //       label: "PDD Docs",
  //       icon: <AttachMoney />,
  //       color: "#f57c00",
  //       id: "pdd-docs-btn",
  //       onClick: handlePDDDocs // Assign the newly created function here
  //     },
  //     {
  //       label: "Pronote",
  //       icon: <AssignmentTurnedIn />,
  //       color: "#43a047",
  //       id: "promote-btn",
  //       onClick: handlePronote // Attach the Pronote handler here
  //     },
  //     {
  //       label: "Clone Status",
  //       icon: <FileCopy />,
  //       color: "#e67e22",
  //       id: "clone-status-btn",
  //       onClick: fetchCloneStatus
  //     },
  //     {
  //       label: "Ready To Push",
  //       icon: <Preview />,
  //       color: "#8e24aa",
  //       id: "ready-to-push-btn",
  //       onClick: handleReadyToPush
  //     }
  //   ];

  return (
    <ComponentSkeleton>
      <Grid container>
        <Grid item xs={12}>
          <Card variant="outlined" style={{ padding: "20px", marginBottom: "20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Select Creator"
                  variant="outlined"
                  select
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                >
                  {creators.map((option) => (
                    <MenuItem key={option.creator} value={option.creator}>
                      {option.creator} {/* Make sure to choose the right property that holds the string you want to display */}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Enter Fi code here"
                  variant="outlined"
                  value={ficode}
                  onChange={(e) => setFiCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={1} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography>OR</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Enter Sm code here"
                  variant="outlined"
                  value={smCode}
                  onChange={(e) => setSMMCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <AnimateButton>
                  <Button variant="contained" color="primary" fullWidth startIcon={<SearchIcon />} onClick={handleSubmit}>
                    SEARCH
                  </Button>
                </AnimateButton>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={2}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#1976D2",
                        color: "#fff",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1
                      }}
                      onClick={handleAccountOpening}
                    >
                      <AccountBalance />
                      Account Opening
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#D32F2F",
                        color: "#fff",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1
                      }}
                      onClick={handleLoanAgreement}
                    >
                      <Assignment />
                      Loan Agreement
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#2D7830",
                        color: "#fff",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1
                      }}
                      onClick={handleHouseVisit}
                    >
                      <Home />
                      House Visit
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#22D4E6",
                        color: "#fff",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1
                      }}
                      onClick={HandleCrif}
                    >
                      <AssignmentTurnedIn />
                      Crif
                    </Button>
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#D32F2F",
                        color: "#fff",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1
                      }}
                      onClick={undefined} // No onClick handler provided in the config
                    >
                      <AccountCircle />
                      Account Aggregator
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#0288D1",
                        color: "#fff",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1
                      }}
                      onClick={undefined} // No onClick handler provided in the config
                    >
                      <Map />
                      Geo Tagging
                    </Button>
                  </Grid>

                  {pddDocCheck && (
                    <Grid item xs={12} md={2}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#F57C00",
                          color: "#fff",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 1
                        }}
                        onClick={handlePDDDocs}
                      >
                        <AttachMoney />
                        PDD Docs
                      </Button>
                    </Grid>
                  )}

                  <Grid item xs={12} md={2}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#43A047",
                        color: "#fff",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1
                      }}
                      onClick={handlePronote}
                    >
                      <AssignmentTurnedIn />
                      Pronote
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#E67E22",
                        color: "#fff",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1
                      }}
                      onClick={fetchCloneStatus}
                    >
                      <FileCopy />
                      Clone Status
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#8E24AA",
                        color: "#fff",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1
                      }}
                      onClick={handleReadyToPush}
                    >
                      <Preview />
                      Ready To Push
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Borrower Details Section */}
        <Grid container spacing={2} style={{ display: "flex", justifyContent: "space-evenly" }}>
          {/* Left Content: Borrower Details */}
          <Grid item xs={12} md={9}>
            <Card variant="outlined" style={{ padding: "20px", marginBottom: "20px" }}>
              <Grid container spacing={2}>
                {/* Row 1 */}
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="FO Name"
                    fullWidth
                    variant="outlined"
                    name="AREAS"
                    value={formData.AREAS}
                    onChange={(e) => setFormData({ ...formData, AREAS: e.target.value })}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="FO Area"
                    fullWidth
                    variant="outlined"
                    name="Name"
                    value={formData.Name}
                    onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Approved"
                    fullWidth
                    variant="outlined"
                    name="NPR"
                    value={formData.Approved}
                    onChange={(e) => setFormData({ ...formData, NPR: e.target.value })}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="FI Tag"
                    fullWidth
                    variant="outlined"
                    name="Tag"
                    value={formData.Tag}
                    onChange={(e) => setFormData({ ...formData, Tag: e.target.value })}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Row 2 */}
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Sourcing Date"
                    fullWidth
                    variant="outlined"
                    name="sourcingDate"
                    value={formData.sourcingDate}
                    onChange={(e) => setFormData({ ...formData, sourcingDate: e.target.value })}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Current Status"
                    fullWidth
                    variant="outlined"
                    name="currentStatus"
                    value={formData.currentStatus}
                    onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Scheme Type"
                    fullWidth
                    variant="outlined"
                    name="schemeType"
                    value={formData.SmCode}
                    onChange={(e) => setFormData({ ...formData, schemeType: e.target.value })}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Score"
                    fullWidth
                    variant="outlined"
                    name="score"
                    value={formData.Score}
                    onChange={(e) => setFormData({ ...formData, SmCode: e.target.value })}
                  />
                </Grid>

                {/* Row 3 */}
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Percentage"
                    fullWidth
                    variant="outlined"
                    name="percentage"
                    value={formData.percentage}
                    onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Card>

            <Card style={{ padding: "20px", display: "flex" }}>
              <Grid container spacing={2} style={{ flex: 1 }}>
                {/* Borrower Details Section */}
                <Grid item xs={12} sm={12} md={10}>
                  <Typography variant="h6" gutterBottom>
                    Borrower Details
                  </Typography>

                  <Grid container spacing={2}>
                    {/* Row 1: All text fields in one line */}
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="Name as Aadhar"
                        fullWidth
                        variant="outlined"
                        name="Aadhar_Name"
                        value={formData.fivAadhar_Name}
                        onChange={(e) => setFormData({ ...formData, fivAadhar_Name: e.target.value })}
                        InputProps={{
                          readOnly: true
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.fivAadhar_Name === formData.fivPan_Name && formData.fivPan_Name === formData.fivBankAcc_Name}
                            onChange={(e) => {
                              // Handle checkbox change if necessary
                            }}
                          />
                        }
                        label="Is verified"
                      />
                      <FormControlLabel control={<Checkbox />} label="OCR verified" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="Name as Pan"
                        fullWidth
                        variant="outlined"
                        name="Pan_Name"
                        value={formData.fivPan_Name}
                        onChange={(e) => setFormData({ ...formData, fivPan_Name: e.target.value })}
                        InputProps={{
                          readOnly: true
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.fivAadhar_Name === formData.fivPan_Name && formData.fivPan_Name === formData.fivBankAcc_Name}
                            onChange={(e) => {
                              // Handle checkbox change if necessary
                            }}
                          />
                        }
                        label="Is verified"
                      />
                      <FormControlLabel control={<Checkbox />} label="OCR verified" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="Name on Bank"
                        fullWidth
                        variant="outlined"
                        name="BankAcc_Name"
                        value={formData.fivBankAcc_Name}
                        onChange={(e) => setFormData({ ...formData, fivBankAcc_Name: e.target.value })}
                        InputProps={{
                          readOnly: true
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.fivAadhar_Name === formData.fivPan_Name && formData.fivPan_Name === formData.fivBankAcc_Name}
                            onChange={(e) => {
                              // Handle checkbox change if necessary
                            }}
                          />
                        }
                        label="Is verified"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="IFSC"
                        fullWidth
                        variant="outlined"
                        name="Bank_IFCS"
                        value={formData.Bank_IFCS}
                        onChange={(e) => setFormData({ ...formData, Bank_IFCS: e.target.value })}
                        InputProps={{
                          readOnly: true
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.fivAadhar_Name === formData.fivPan_Name && formData.fivPan_Name === formData.fivBankAcc_Name}
                            onChange={(e) => {
                              // Handle checkbox change if necessary
                            }}
                          />
                        }
                        label="Is verified"
                      />
                    </Grid>
                  </Grid>
                  <Divider></Divider>
                  {/* Checkboxes for verification */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <FormControlLabel control={<Checkbox />} label="KYC Done manually" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControlLabel control={<Checkbox />} label="Is Scanned" />
                    </Grid>
                  </Grid>
                  {/* Divider */}
                  <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                    <Typography variant="subtitle2">BORROWER DETAILS</Typography>
                    <Divider sx={{ width: "100%", margin: "8px 0" }} />
                  </Box>
                </Grid>

                {/* User Image Section */}
                <Grid item xs={12} sm={12} md={2} container justifyContent="center" alignItems="center">
                  <img
                    alt="User Image"
                    style={{ width: "100%", height: "auto", maxHeight: "120px" }} // Set responsive image size
                    src={`https://predeptest.paisalo.in:8084${formData.Picture}`}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          {/* Right Sidebar */}
          {/* <RightSidebar activeList={activeList} handleToggleList={handleToggleList} ficode={setFiCode} creator={setCreator} /> */}
          <RightSidebar activeList={activeList} handleToggleList={handleToggleList} ficode={newficode} creator={newcreator} />
        </Grid>
        {/* Sticky Action Bar */}
        {/* Dialog for Clone Status */}
        <CloneStatusDialog open={openPopup} onClose={() => setOpenPopup(false)} cloneData={cloneData} />
        <Box>
          <Details isEditable={isEditable} ficode={newficode} creator={newcreator} />
        </Box>
      </Grid>
      
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth>
                <DialogTitle>Documents Retrieved</DialogTitle>
                <DialogContent>
                    {documents.length > 0 ? (
                        documents.map((doc, index) => (
                            <Box
                                key={index}
                                mb={2}
                                onClick={() => handleDocumentClick(doc.FilePath)}
                                style={{ cursor: 'pointer' }}
                            >
                                <Typography variant="subtitle1"><strong>ID:</strong> {doc.ID}</Typography>
                                <Typography variant="subtitle1"><strong>Doc Name:</strong> {doc.DocName}</Typography>
                                <Typography variant="subtitle1"><strong>Doc Path:</strong> {doc.DocPath}</Typography>
                                <Typography variant="subtitle1"><strong>Fi Id:</strong> {doc.Fi_Id}</Typography>
                                <Typography variant="subtitle1"><strong>File Path:</strong> {doc.FilePath}</Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography>No documents found.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
            {/* PDF Viewer Modal */}
            <Dialog open={!!selectedDocPath} onClose={() => setSelectedDocPath(null)} fullWidth maxWidth="lg">
                <DialogTitle>Document Preview</DialogTitle>
                <DialogContent>
                    {selectedDocPath ? (
                        <iframe
                            src={selectedDocPath}
                            style={{ width: '100%', height: '500px', border: 'none' }}
                            title="Document Preview"
                        />
                    ) : (
                        <Typography>File not available to view.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedDocPath(null)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
    </ComponentSkeleton>
    
  );
}

export default LoanTrackerPage;
