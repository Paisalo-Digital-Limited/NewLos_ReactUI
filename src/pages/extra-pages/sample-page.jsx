// import React, { ChangeEvent, useState } from "react";
// import Department from "./Department";
// import Designation from "./Designation";
// import Role from "./Role";
// import Permission from "./Permission";
// import {
//   Card,
//   Radio,
//   RadioGroup,
//   FormControl,
//   FormControlLabel,
//   Typography,
//   Box,
//   Divider,
//   Chip,
// } from "@mui/material";

// export default function UserAccess() {
//   const [selectedPage, setSelectedPage] = useState("getrolepermission");

//   const handlePageChange = (event) => {
//     setSelectedPage(event.target.value);
//   };

//   return (
//     <>
//       <Box sx={{ margin: "0 auto" }}>
//       <Card
//         sx={{
//           boxShadow: "none",
//           borderRadius: "7px",
//           mb: 2,
//           padding: { xs: "18px", sm: "20px", lg: "25px" },
//         }}
//       >
//         <Typography variant="h6" sx={{ marginBottom: "20px", fontWeight: "bold", fontSize:'20px' }}>
//           User Access
//         </Typography>

//         {/* Radio Buttons */}
//         <FormControl component="fieldset" fullWidth>
//           <RadioGroup
//             row
//             value={selectedPage}
//             onChange={handlePageChange}
//             sx={{ mt: 3, justifyContent: "left" }}
//           >
//             {[
//               { value: "getrolepermission", label: "Get Role Permission" },
//               { value: "getrole", label: "Get Role" },
//               { value: "department", label: "Department" },
//               { value: "designation", label: "Designation" },
//             ].map((option) => (
//               <FormControlLabel
//                 key={option.value}
//                 value={option.value}
//                 control={
//                   <Radio
//                     sx={{
//                       color: "#4CAF50",
//                       "&.Mui-checked": {
//                         color: "#388E3C",
//                       },
//                     }}
//                   />
//                 }
//                 label={
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         fontWeight: selectedPage === option.value ? "bold" : "normal",
//                         color: selectedPage === option.value ? "#388E3C" : "#000",
//                       }}
//                     >
//                       {option.label}
//                     </Typography>
//                     <Box
//                       sx={{
//                         width: "100%",
//                         height: "4px",
//                         backgroundColor: selectedPage === option.value ? "#4CAF50" : "transparent",
//                         borderRadius: "4px",
//                         transition: "background-color 0.3s ease",
//                       }}
//                     />
//                   </Box>
//                 }
//               />
//             ))}
//           </RadioGroup>
//         </FormControl>
//       </Card>

//       <Card
//         sx={{
//           boxShadow: "none",
//           borderRadius: "7px",
//           mb: 2,
//           padding: { xs: "18px", sm: "20px", lg: "25px" },
//         }}
//       >
//         {selectedPage === "department" && <Department />}
//         {selectedPage === "designation" && <Designation />}
//         {selectedPage === "getrole" && <Role />}
//         {selectedPage === "getrolepermission" && <Permission />}
//       </Card>
//       </Box>
//       </>
//   );
// }

 
import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Select,
  Table,
  Tooltip,
  Modal,
  Form,
  Input,
  Radio,
  Upload,
  ConfigProvider,
  message,
  Switch,
  Typography,
  Space,
  Button
} from 'antd';
import {
  CheckCircleOutlined,
  SearchOutlined,
  DownloadOutlined,
  UploadOutlined,
  EditOutlined,
  FileAddOutlined,
  UserOutlined,
  WalletOutlined,
  FileTextOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
  SendOutlined,
  CloudUploadOutlined,
  SaveOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

const { Option } = Select;

const ListData = () => {
  const [user, setUser] = useState('');
  const [userError, setUserError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [bulkFile, setBulkFile] = useState(null);
  const [rowData, setRowData] = useState([
    { id: 1, sNo: 1, name: 'Department 1', description: 'Desc 1', code: 'D1', head: 'Head 1', status: false },
    { id: 2, sNo: 2, name: 'Department 2', description: 'Desc 2', code: 'D2', head: 'Head 2', status: true }
  ]);

  const handleSubmit = () => {
    if (!user) {
      setUserError('Please select a role.');
    } else {
      setUserError('');
      console.log('Form submitted with user:', user);
    }
  };

  const openEditModal = (row) => {
    setCurrentRow(row);
    setEditModalVisible(true);
  };

  const handleEditSubmit = (values) => {
    const updatedRowData = rowData.map((row) => (row.id === currentRow.id ? { ...row, ...values } : row));
    setRowData(updatedRowData);
    setEditModalVisible(false);
    message.success('Department updated successfully!');
  };

  const toggleStatus = (id) => {
    const updatedRowData = rowData.map((row) => (row.id === id ? { ...row, status: !row.status } : row));
    setRowData(updatedRowData);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <Card style={{ marginBottom: '25px' }}>
        <Row gutter={16} style={{ marginBottom: 10 }}>
          <Col span={6}>
            <Select placeholder="Select Role" value={user} onChange={(value) => setUser(value)} style={{ width: '100%' }}>
              <Option value="user1">User 1</Option>
              <Option value="user2">User 2</Option>
              <Option value="user3">User 3</Option>
            </Select>
            {userError && <p style={{ color: 'red' }}>{userError}</p>}
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              icon={<CheckCircleOutlined />}
              onClick={handleSubmit}
              style={{
                background: 'linear-gradient(135deg,rgb(81, 148, 4),rgb(73, 134, 2))',
                border: 'none',
                color: 'white',
                marginRight: 8,
                inset: '-1px',
                opacity: '1',
                transition: 'all 0.3s',
                ':hover': {
                  background: 'linear-gradient(135deg,rgb(120, 170, 4),rgb(90, 140, 2))',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s',
                }
              }}
            >
              Submit
            </Button>
          </Col>
          <Col>
            <Button
              size="large"
              icon={<SearchOutlined />}
              onClick={() => console.log('Search Clicked')}
              style={{
                background: 'linear-gradient(135deg, #6253e1, #04befe)',
                border: 'none',
                color: 'white',
                marginRight: 8
              }}
            >
              Search
            </Button>
          </Col>
          <Col>
            <Button
              size="large"
              icon={<DownloadOutlined />}
              onClick={() => console.log('Export Clicked')}
              style={{
                background: 'linear-gradient(90deg, #FF4E50,rgb(233, 195, 9))',
                border:"none",
                color:"white",
                marginRight:"8",
              }}
            >
              Export
            </Button>
          </Col>
          <Col>
            <Button
              size="large"
              icon={<UploadOutlined />}
              style={{
                background: 'linear-gradient(135deg,rgb(217, 9, 253),rgb(69, 3, 97))',
                border: 'none',
                color: 'white',
                marginRight: 8
              }}
            >
              Upload
            </Button>
          </Col>
          <Col>
            <Button
              size="large"
              icon={<FileAddOutlined />}
              onClick={() => console.log('Sample Clicked')}
              style={{
                background: 'linear-gradient(135deg,rgb(163, 124, 5),rgb(245, 152, 12))',
                border: 'none',
                color: 'white',
                marginRight: 8
              }}
            >
              Sample
            </Button>
          </Col>
          <Col>
            <Button
              size="large"
              icon={<FileAddOutlined />}
              onClick={() => console.log('Update Clicked')}
              style={{
                background: 'linear-gradient(135deg,rgb(248, 8, 88),rgb(189, 68, 112))',
                border: 'none',
                color: 'white',
                marginRight: 8
              }}
            >
              Update
            </Button>
          </Col>
        </Row>

        {/* Display department data in a table */}
        <Row gutter={16}>
          <Col span={24}>
            <Table dataSource={rowData} rowKey="id" loading={loading} pagination={false} style={{ marginTop: 20 }}>
              <Table.Column title="S.No" dataIndex="sNo" key="sNo" />
              <Table.Column title="Department Name" dataIndex="name" key="name" />
              <Table.Column title="Description" dataIndex="description" key="description" />
              <Table.Column title="Code" dataIndex="code" key="code" />
              <Table.Column title="Head" dataIndex="head" key="head" />
              <Table.Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <div>
                    <Tooltip title="Edit">
                      <Button
                        icon={<EditOutlined />}
                        onClick={() => openEditModal(record)}
                        shape="circle"
                        size="large"
                        style={{ marginRight: 8, color: 'red' }}
                      />
                    </Tooltip>
                    <Tooltip title="Personal Info">
                      <Button icon={<UserOutlined />} shape="circle" size="large" style={{ marginRight: 8, color: 'red' }} />
                    </Tooltip>
                    <Tooltip title="Income">
                      <Button icon={<WalletOutlined />} shape="circle" size="large" style={{ marginRight: 8, color: 'red' }} />
                    </Tooltip>
                    <Tooltip title="Document">
                      <Button icon={<FileTextOutlined />} shape="circle" size="large" style={{ marginRight: 8, color: 'red' }} />
                    </Tooltip>
                    <Tooltip title="Download">
                      <Button icon={<DownloadOutlined />} shape="circle" size="large" style={{ marginRight: 8, color: 'red' }} />
                    </Tooltip>
                    <Tooltip title="View">
                      <Button icon={<EyeOutlined />} shape="circle" size="large" style={{ marginRight: 8, color: 'red' }} />
                    </Tooltip>
                    <Tooltip title="Back">
                      <Button icon={<ArrowLeftOutlined />} shape="circle" size="large" style={{ marginRight: 8, color: 'red' }} />
                    </Tooltip>
                    <Tooltip title="Send">
                      <Button icon={<SendOutlined />} shape="circle" size="large" style={{ marginRight: 8, color: 'red' }} />
                    </Tooltip>
                    <Switch checked={record.status} size="large" onChange={() => toggleStatus(record.id)} style={{ marginLeft: 8 }} />
                  </div>
                )}
              />
            </Table>
          </Col>
        </Row>
      </Card>

      {/* Edit Modal */}
      <Modal title="Edit Departments" visible={editModalVisible} onCancel={() => setEditModalVisible(false)} footer={null}>
        <Form initialValues={currentRow} onFinish={handleEditSubmit} layout="vertical">
          <Form.Item name="name" label="Department Name">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="code" label="Code">
            <Input />
          </Form.Item>
          <Form.Item name="head" label="Head of Department">
            <Input />
          </Form.Item>
          <Form.Item>
          <Button
              size="large"
              icon={<SaveOutlined />}
              style={{
                background: 'linear-gradient(135deg,rgb(44, 47, 218),rgb(116, 68, 248))',
                border: 'none',
                color: 'white',
                marginRight: 8
              }}
            >
              Save
            </Button>
            <Button 
               size="large"
               icon={<CloseCircleOutlined />}
               onClick={() => setEditModalVisible(false)} 
               style={{ 
                marginLeft: 8 ,
                background: 'linear-gradient(135deg,rgb(224, 43, 36),rgba(240, 37, 37, 0.99))',
                border: 'none',
                color: 'white',
                }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* User Access Card */}
      <Card title="User Access" style={{ marginTop: 20 }}>
        <Radio.Group>
          <Radio size="large" value="brand">
            Brand
          </Radio>
          <Radio size="large" value="modeltype">
            Model Type
          </Radio>
          <Radio size="large" value="fuel">
            Fuel
          </Radio>
          <Radio size="large" value="vehicle">
            Vehicle
          </Radio>
        </Radio.Group>
      </Card>

      <Card style={{ boxShadow: 'none', borderRadius: '7px', padding: '20px', marginTop: '20px' }}>
        <Row gutter={[16, 16]} style={{ display: 'flex', flexDirection: 'column' }}>
          {['Upload File'].map((label, index) => {
            const isBulk = label === 'Upload File';
            return (
              <Col key={index}>
                <Card style={{ boxShadow: 'none', borderRadius: '7px', marginBottom: '10px', padding: '25px' }}>
                  <Typography.Title level={4} style={{ fontWeight: 'bold', marginBottom: '5px', color: 'red' }}>
                    {label} <span style={{ color: 'red' }}>*</span>
                  </Typography.Title>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Space>
                      <Upload showUploadList={false} style={{ marginBottom: '10px' }}>
                        <Button
                          icon={<CloudUploadOutlined />}
                          type="default"
                          size="large"
                          style={{ borderColor: '#3f51b5', fontWeight: 600, padding: '8px 20px' }}
                        >
                          {isBulk ? (bulkFile ? bulkFile.name : 'Select File') : 'Select File'}
                        </Button>
                      </Upload>

                      <Button
                        className="gradientButtonUpload"
                        size="large"
                        icon={<UploadOutlined />}
                        style={{
                          background: 'linear-gradient(135deg,rgb(217, 9, 253),rgb(193, 102, 233))',
                          border: 'none',
                          color: 'white',
                          marginRight: 8
                        }}
                      >
                        Upload
                      </Button>

                      <Button
                        className="gradientButtonSample"
                        size="large"
                        icon={<FileAddOutlined />}
                        onClick={() => console.log('Sample Clicked')}
                        style={{
                          background: 'linear-gradient(135deg,rgb(163, 124, 5),rgb(245, 152, 12))',
                          border: 'none',
                          color: 'white',
                          marginRight: 8
                        }}
                      >
                        Sample
                      </Button>
                    </Space>
                  </Space>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>
    </>
  );
};

export default ListData;



// import  React,{useState, useEffect} from "react";
// import {
//     Card,
//     Grid,
//     Typography,
//     Button,
//     Box,
//     Checkbox,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     FormHelperText,
//     TableContainer,
//     Table,
//     TableHead,
//     Paper,
//     TableRow,
//     TableCell,
//     TableBody,
//     Tooltip,
//     IconButton,
//     Switch,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     TextField,
//     TableFooter,
//     TablePagination,
//     Stack,
//     RadioGroup,
//     FormControlLabel,
//     Radio

// } from "@mui/material";
// import Swal from 'sweetalert2';
// import EditCalendarIcon from "@mui/icons-material/EditCalendar";
// import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
// import LocalAtmIcon from '@mui/icons-material/LocalAtm';
// import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
// import DownloadIcon from '@mui/icons-material/Download';
// import PreviewIcon from '@mui/icons-material/Preview';
// import BackspaceIcon from '@mui/icons-material/Backspace';
// import SendIcon from '@mui/icons-material/Send';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import SearchIcon from '@mui/icons-material/Search';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdateGood';
// import BackupIcon from '@mui/icons-material/Backup';
// import EditIcon from "@mui/icons-material/Edit";
// import CircularProgress from '@mui/material/CircularProgress';
// import LinearProgress from '@mui/material/LinearProgress';
// import Brand from "../vechicles/Brand";
// import Modeltype from "../vechicles/Modeltype";
// import Fuel from "../vechicles/Fuel";
// import Vehicle from "../vechicles/vehicle"; 
// // import UpdateIcon from '@mui/icons-material/Update';


// const ListData  = () => {
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [selectAll, setSelectAll] = useState(false);
//     const [filteredRows, setFilteredRows] = useState("row");
//     const [bulkFile, setBulkFile] = useState(null);
//     const [rejectFile, setRejectFile] = useState(null);
//     const [fileType, setFileType] = useState(null);
//     const [bulkFileSelected, setBulkFileSelected] = useState(false);
//     const [rejectFileSelected, setRejectFileSelected] = useState(false);
//     const [selectedFileName, setSelectedFileName] = useState("");
//     const [user, setUser] = useState("");
//     const [userError, setUserError] = useState("");
//     const [filteredData, setFilteredData] = useState([]);
//     const [rowsPerPage, setRowsPerPage] = useState(1);
//     const [page, setPage] = useState(1);
//     const [row, setRow] = useState([
//         { id: 1, sNo: 1, name: "Department 1", description: "Desc 1", code: "D1", head: "Head 1" },
//         // ... Add additional rows as needed
//         { id: 12, sNo: 12, name: "Department 12", description: "Desc 12", code: "D12", head: "Head 12" },
//     ]);
//     const [loading, setLoading] = useState(true);
//     const [progress, setProgress] = useState(0);
//      const [selectedPage, setSelectedPage] = useState("brand");


//      const handlePageChange = (event) => {
//         setSelectedPage(event.target.value);
//       };

//     const rows = Array.from({ length: 20 }, (_, index) => ({
//         id: index + 1,
//         pageName: `John Doe ${index + 1}`,
//     }));

//     const handleSelectRow = (id) => {
//         const newSelectedRows = selectedRows.includes(id)
//             ? selectedRows.filter((rowId) => rowId !== id)
//             : [...selectedRows, id];
//         setSelectedRows(newSelectedRows);
//     };

//     const handleSelectAll = () => {
//         if (selectAll) {
//             setSelectedRows([]);
//         } else {
//             setSelectedRows(rows.map((row) => row.id));
//         }
//         setSelectAll(!selectAll);
//     };

//     const handleSubmit = () => {
//         if (!user) {
//             setUserError("Please select a role.");
//         } else {
//             setUserError("");
//             console.log("Form submitted with user:", user);
//         }
//     };

//     const toggleStatus = (id) => {
//         setFilteredRows(
//             filteredRows.map((row) =>
//                 row.id === id ? { ...row, status: !row.status } : row
//             )
//         );
//     };

//     const handleFileChange = (e, type) => {
//         if (e.target.files && e.target.files[0]) {
//             const selectedFile = e.target.files[0];
//             console.log(`File selected for type ${type}:`, selectedFile);

//             if (type === "bulk") {
//                 setBulkFile(selectedFile);
//                 setBulkFileSelected(true);
//                 setFileType("bulk");
//                 setSelectedFileName(selectedFile.name);
//             } else if (type === "reject") {
//                 setRejectFile(selectedFile);
//                 setRejectFileSelected(true);
//                 setFileType("reject");
//                 setSelectedFileName(selectedFile.name);
//             }
//         }
//     };

//     const [rowe, setRowes] = useState([
//         { id: 1, sNo: 1, name: "Department 1", description: "Desc 1", code: "D1", head: "Head 1" },
//         // ... Add additional rows as needed
//         { id: 12, sNo: 12, name: "Department 12", description: "Desc 12", code: "D12", head: "Head 12" },
//     ]);

//     const [editModalOpen, setEditModalOpen] = useState(false);
//     const [currentRows, setCurrentRows] = useState([]); // Store entries for the edit modal

//     const openEditModal = (row) => {
//         setCurrentRows([row]);
//         setEditModalOpen(true);
//     };
//     const openEditModale = (row) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: 'Do you want to update this row?',
//             icon: 'error',
//             showCancelButton: true,
//             confirmButtonColor: 'green',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, update it!',
//             cancelButtonText: 'Cancel'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 // Pre-fill with current row data if user confirms
//                 setCurrentRows(row);
//                 setEditModalOpen(true);
//             }
//         });
//     };

//     const handleEditSubmit = () => {
//         // Update the original rows with modified currentRows
//         setRowes(currentRows);
//         setEditModalOpen(false);
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             // Simulating a fetch with a timeout
//             setTimeout(() => {
//                 setRowes(rowe);
//                 setLoading(false);
//             }, 5000); // 5 seconds
//         };

//         fetchData();
//     }, []);


//     useEffect(() => {
//         const timer = setInterval(() => {
//             setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
//         }, 800);

//         return () => {
//             clearInterval(timer);
//         };
//     }, []);


//     return (
//         <>
//             <Card
//                 sx={{
//                     boxShadow: "none",
//                     borderRadius: "7px",
//                     mb: "25px",
//                     padding: { xs: "18px", sm: "20px", lg: "25px" },
//                     position: "relative",
//                 }}
//             >
//                 <Grid container spacing={2} sx={{ marginBottom: "10px", display: 'flex', flexWrap: 'nowrap' }}>
//                     <Grid item  xs={12} sm={3} md={2}  >
//                         <FormControl fullWidth error={!!userError}>
//                             <InputLabel>Role</InputLabel>
//                             <Select value={user} onChange={(e) => setUser(e.target.value)} label="Role">
//                                 <MenuItem value="user1">User 1</MenuItem>
//                                 <MenuItem value="user2">User 2</MenuItem>
//                                 <MenuItem value="user3">User 3</MenuItem>
//                             </Select>
//                             {userError && <FormHelperText>{userError}</FormHelperText>}
//                         </FormControl>
//                     </Grid>

//                     {/* Individual Buttons Instead of Mapping */}
//                     <Grid item>
//                         <Button
//                             variant="contained"
//                             size="small"

//                             sx={{
//                                 padding: "10px 12px",
//                                 fontSize: "15px",
//                                 background: "darkgreen",
//                                 borderRadius: "8px",
//                                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                                 "&:hover": {
//                                     background: "linear-gradient(135deg,rgb(44, 209, 113),rgb(20, 184, 56))",
//                                     boxShadow: "0px 8px 15px rgba(243, 205, 205, 0.4)",
//                                     transform: "scale(1.05)",
//                                     "& .MuiButton-startIcon": {
//                                         transform: "scale(1.2)",
//                                         filter: "drop-shadow(0 4px 8px rgba(255, 255, 255, 0.6))",
//                                     }
//                                 },
//                                 "& .MuiButton-startIcon": {
//                                     fontSize: "24px",
//                                     transition: "transform 0.3s ease, filter 0.3s ease",
//                                     filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
//                                 },
//                             }}
//                             startIcon={<CheckBoxIcon />}


//                             onClick={handleSubmit}

//                         >
//                             SUBMIT
//                         </Button>
//                     </Grid>
//                     <Grid item>
//                         <Button
//                             variant="contained"
//                             size="small"
//                             sx={{
//                                 padding: "10px 12px",
//                                 fontSize: "15px",
//                                 background: "linear-gradient(135deg, #2196F3, #64B5F6)",
//                                 borderRadius: "8px",
//                                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                                 "&:hover": {
//                                     background: "linear-gradient(135deg,rgb(30, 119, 192),rgb(54, 141, 212))",
//                                     boxShadow: "0px 8px 15px rgba(238, 222, 222, 0.4)",
//                                     transform: "scale(1.05)",
//                                     "& .MuiButton-startIcon": {
//                                         transform: "scale(1.2)",
//                                         filter: "drop-shadow(0 4px 8px rgba(255, 255, 255, 0.6))",
//                                     }
//                                 },
//                                 "& .MuiButton-startIcon": {
//                                     fontSize: "24px",
//                                     transition: "transform 0.3s ease, filter 0.3s ease",
//                                     filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
//                                 },

//                             }}
//                             startIcon={<SearchIcon />}
//                             onClick={() => console.log("Search Clicked")}
//                         // Add your styling here
//                         >
//                             SEARCH
//                         </Button>
//                     </Grid>
//                     <Grid item>
//                         <Button
//                             variant="contained"
//                             size="small"
//                             sx={{
//                                 padding: "10px 12px",
//                                 fontSize: "15px",
//                                 background: "linear-gradient(135deg, #009688, #4DB6AC)",
//                                 borderRadius: "8px",
//                                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                                 "&:hover": {
//                                     background: "linear-gradient(135deg,rgb(46, 221, 204),rgb(57, 161, 151))",
//                                     boxShadow: "0px 8px 15px rgba(241, 215, 215, 0.4)",
//                                     transform: "scale(1.05)",
//                                     "& .MuiButton-startIcon": {
//                                         transform: "scale(1.2)",
//                                         filter: "drop-shadow(0 4px 8px rgba(255, 255, 255, 0.6))",
//                                     }
//                                 },
//                                 "& .MuiButton-startIcon": {
//                                     fontSize: "24px",
//                                     transition: "transform 0.3s ease, filter 0.3s ease",
//                                     filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
//                                 },
//                             }}
//                             startIcon={<DownloadIcon />}
//                             onClick={() => console.log("Export Clicked")}

//                         >
//                             EXPORT
//                         </Button>
//                     </Grid>
//                     <Grid item>
//                         <Button
//                             variant="contained"
//                             size="small"
//                             sx={{
//                                 padding: "10px 12px",
//                                 fontSize: "15px",
//                                 background: "linear-gradient(135deg, #9C27B0, #BA68C8)",
//                                 borderRadius: "8px",
//                                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                                 "&:hover": {
//                                     background: "linear-gradient(135deg,rgb(121, 64, 131),rgb(163, 103, 173))",
//                                     boxShadow: "0px 8px 15px rgba(241, 203, 203, 0.4)",
//                                     transform: "scale(1.05)",
//                                     "& .MuiButton-startIcon": {
//                                         transform: "scale(1.2)",
//                                         filter: "drop-shadow(0 4px 8px rgba(255, 255, 255, 0.6))",
//                                     }
//                                 },
//                                 "& .MuiButton-startIcon": {
//                                     fontSize: "24px",
//                                     transition: "transform 0.3s ease, filter 0.3s ease",
//                                     filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
//                                 },
//                             }}
//                             startIcon={<FileUploadIcon />}
//                             onClick={() => console.log("Upload Clicked")}

//                         >
//                             UPLOAD
//                         </Button>
//                     </Grid>
//                     <Grid item>
//                         <Button
//                             variant="contained"
//                             size="small"
//                             sx={{
//                                 padding: "10px 12px",
//                                 fontSize: "15px",
//                                 background: "linear-gradient(135deg, #8BC34A,rgb(113, 202, 11))",
//                                 borderRadius: "8px",
//                                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                                 "&:hover": {
//                                     background: "linear-gradient(135deg,rgb(114, 161, 61) , rgb(89, 151, 18))",
//                                     boxShadow: "0px 8px 15px rgba(238, 207, 207, 0.4)",
//                                     transform: "scale(1.05)",
//                                     "& .MuiButton-startIcon": {
//                                         transform: "scale(1.2)",
//                                         filter: "drop-shadow(0 4px 8px rgba(255, 255, 255, 0.6))",
//                                     }
//                                 },
//                                 "& .MuiButton-startIcon": {
//                                     fontSize: "30px",
//                                     transition: "transform 0.3s ease, filter 0.3s ease",
//                                     filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
//                                 },
//                             }}
//                             startIcon={<AttachFileIcon sx={{ fontSize: "35px" }} />}
//                             onClick={() => console.log("Sample Clicked")}

//                         >
//                             SAMPLE
//                         </Button>
//                     </Grid>
//                     <Grid item>
//                         <Button
//                             variant="contained"
//                             size="small"
//                             sx={{
//                                 padding: "10px 12px",
//                                 fontSize: "15px",
//                                 background: "linear-gradient(135deg, #E91E63, #F06292)",
//                                 borderRadius: "8px",
//                                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                                 "&:hover": {
//                                     background: "linear-gradient(135deg,rgb(175, 57, 96),rgb(187, 65, 106) )",
//                                     boxShadow: "0px 8px 15px rgba(245, 213, 213, 0.4)",
//                                     transform: "scale(1.05)",
//                                     // Apply the hover effects to the icon on button hover
//                                     "& .MuiButton-startIcon": {
//                                         transform: "scale(1.2)",
//                                         filter: "drop-shadow(0 4px 8px rgba(255, 255, 255, 0.6))",
//                                     }
//                                 },
//                                 // Base properties for the icon
//                                 "& .MuiButton-startIcon": {
//                                     fontSize: "24px",
//                                     transition: "transform 0.3s ease, filter 0.3s ease",
//                                     filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
//                                 },
//                             }}
//                             startIcon={<SecurityUpdateGoodIcon />}
//                         >
//                             UPDATE
//                         </Button>
//                     </Grid>
//                 </Grid>
//                  {/* <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
//                      <Typography variant="body2" sx={{ fontSize: "14px" }}>Select All</Typography>
//                      <Checkbox 
//                          checked={selectAll}
//                          onChange={handleSelectAll}
//                          color="primary"
//                     />
//                  </Grid>  */}

//                 <Grid container spacing={2} marginTop={2}>
//                     {rows.map((row) => (
//                         <Grid item xs={12} sm={4} md={3} key={row.id}>
//                             <Card
//                                 variant="outlined"
//                                 sx={{
//                                     padding: 2,
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'space-between',
//                                     backgroundColor: "rgb(236, 247, 239)"
//                                 }}
//                             >
//                                 <Typography variant="body1">{row.pageName}</Typography>
//                                 <Checkbox
//                                     checked={selectedRows.includes(row.id)}
//                                     onChange={() => handleSelectRow(row.id)}
//                                     color="primary"
//                                     sx={{
//                                         "& .MuiSvgIcon-root": {
//                                             "& path": {
//                                                 fill: "rgba(34, 193, 195, 0.9)",
//                                             },
//                                         },
//                                         "&.Mui-checked .MuiSvgIcon-root": {
//                                             "& path": {
//                                                 fill: "green",
//                                             },
//                                         },
//                                     }}
//                                 />
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Card>
//             <Card
//                 sx={{
//                     boxShadow: "none",
//                     borderRadius: "7px",
//                     mb: "25px",
//                     padding: { xs: "18px", sm: "20px", lg: "25px" },
//                     position: "relative",
//                 }}
//             >
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow
//                                 sx={{
//                                     textTransform: "uppercase",
//                                     background: "#ff4c4c",
//                                     color: "white",
//                                     textAlign: "center",
//                                     fontSize: "10px",
//                                     letterSpacing: "1px",
                                      
//                                 }}
//                             >
//                                 {['S.No', 'ID', 'Name', 'Description', 'Code', 'Head', 'Action'].map((header, index) => (
//                                     <TableCell
//                                         key={index}
//                                         sx={{
//                                             textAlign:"center",
//                                             color: 'white',
//                                         }}
//                                     >
//                                      {header}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {row.map((row) => (
//                                 <TableRow key={row.id}>
//                                     <TableCell sx={{textAlign:"center"}}>{row.sNo}</TableCell>
//                                     <TableCell sx={{textAlign:"center"}}>{row.id}</TableCell>
//                                     <TableCell sx={{textAlign:"center"}}>{row.name}</TableCell>
//                                     <TableCell sx={{textAlign:"center"}}>{row.description}</TableCell>
//                                     <TableCell sx={{textAlign:"center"}}>{row.code}</TableCell>
//                                     <TableCell sx={{textAlign:"center"}}>{row.head}</TableCell>
//                                     <TableCell>
//                                         <Tooltip title="Edit">
//                                             <IconButton>
//                                                 <EditCalendarIcon sx={{ fontSize: "24px", color: "red" }} />
//                                             </IconButton>
//                                         </Tooltip>
//                                         <Tooltip title="Personal Info">
//                                             <IconButton>
//                                                 <PermContactCalendarIcon sx={{ fontSize: "24px", color: "red" }} />
//                                             </IconButton>
//                                         </Tooltip>
//                                         <Tooltip title="Income">
//                                             <IconButton>
//                                                 <LocalAtmIcon sx={{ fontSize: "28px", color: "red" }} />
//                                             </IconButton>
//                                         </Tooltip>
//                                         <Tooltip title="Document">
//                                             <IconButton>
//                                                 <DocumentScannerIcon sx={{ fontSize: "28px", color: "red" }} />
//                                             </IconButton>
//                                         </Tooltip>
//                                         <Tooltip title="Download">
//                                             <IconButton>
//                                                 <DownloadIcon sx={{ fontSize: "28px", color: "red" }} />
//                                             </IconButton>
//                                         </Tooltip>
//                                         <Tooltip title="View">
//                                             <IconButton>
//                                                 <PreviewIcon sx={{ fontSize: "28px", color: "red" }} />
//                                             </IconButton>
//                                         </Tooltip>
//                                         <Tooltip title="Back">
//                                             <IconButton>
//                                                 <BackspaceIcon sx={{ fontSize: "28px", color: "red" }} />
//                                             </IconButton>
//                                         </Tooltip>
//                                         <Tooltip title="Send">
//                                             <IconButton>
//                                                 <SendIcon sx={{ fontSize: "28px", color: "red" }} />
//                                             </IconButton>
//                                         </Tooltip>
//                                         <Switch color="secondary"

//                                             checked={row.status}
//                                             onChange={() => toggleStatus(row.id)}
//                                             sx={{
//                                                 '& .MuiSwitch-switchBase': {
//                                                     '&.Mui-checked': {
//                                                         '& .MuiSwitch-thumb': {
//                                                             background: "linear-gradient(135deg, #4caf50, #8bc34a)",
//                                                         },
//                                                     },
//                                                     '&:not(.Mui-checked) .MuiSwitch-thumb': {
//                                                         background: 'red',
//                                                     },
//                                                     '&.Mui-checked + .MuiSwitch-track': {
//                                                         border: '1px solid grey',
//                                                         background: "linear-gradient(135deg, #4caf50, #8bc34a)",
//                                                     },
//                                                     '&:not(.Mui-checked) + .MuiSwitch-track': {
//                                                         backgroundColor: 'red',
//                                                     },
//                                                 },
//                                                 '& .MuiSwitch-switchBase + .MuiSwitch-track': {
//                                                     border: 'none',
//                                                 },
//                                             }}
//                                         />
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                         <TableFooter>
//                             <TableRow>
//                                 <TablePagination
//                                     rowsPerPageOptions={[5, 10, 25]}
//                                     count={filteredData.length}
//                                     rowsPerPage={rowsPerPage}
//                                     page={page}
//                                     onPageChange={(event, newPage) => {
//                                         setPage(newPage);

//                                     }}
                                    
//                                 />
//                             </TableRow>
//                         </TableFooter>
//                     </Table>
//                 </TableContainer>
//             </Card>

//             <Card
//                 sx={{
//                     boxShadow: "none",
//                     borderRadius: "7px",
//                     mb: "25px",
//                     padding: { xs: "18px", sm: "20px", lg: "25px" },
//                     position: "relative",
//                 }}
//             >
//                 <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
//                     {["Bulk NEFT Approved", "NEFT Reject/Return Cases"].map((label, index) => {
//                         const isBulk = label === "Bulk NEFT Approved";

//                         return (
//                             <Card
//                                 sx={{ boxShadow: "none", borderRadius: "7px", mb: "10px", p: "25px" }}
//                             >
//                                 <Typography
//                                     variant="subtitle1"
//                                     sx={{
//                                         fontWeight: 'bold',
//                                         marginBottom: '5px',
//                                         color: 'red !important',
//                                     }}
//                                 >
//                                     {label} <span style={{ color: 'red' }}>*</span>
//                                 </Typography>

//                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                                         <Button
//                                             variant="outlined"
//                                             component="label"
//                                             size="large"
//                                             startIcon={<BackupIcon />} // Change icon to File Icon
//                                             sx={{
//                                                 textTransform: 'none',
//                                                 color: '#3f51b5',
//                                                 borderColor: '#3f51b5',
//                                                 fontWeight: 600,
//                                                 fontSize: '0.875rem',
//                                                 padding: '8px 20px',
//                                                 borderRadius: '5px',
//                                                 '&:hover': {
//                                                     borderColor: '#red',
//                                                     background: 'rgba(63, 81, 181, 0.1)', // Lighten background on hover
//                                                 },
//                                             }}
//                                         >
//                                             <input
//                                                 type="file"
//                                                 style={{ display: 'none', marginTop: "10px" }} // Hide input
//                                                 onChange={(e) => handleFileChange(e, isBulk ? 'bulk' : 'reject')}
//                                             />
//                                             {isBulk ? bulkFile ? bulkFile.name : 'Select  File' : rejectFile ? rejectFile.name : 'Select  File'}
//                                         </Button>

//                                         <Button
//                                             variant="contained"
//                                             size="small"
//                                             sx={{
//                                                 padding: "10px 12px",
//                                                 fontSize: "15px",
//                                                 background: "linear-gradient(135deg, #9C27B0, #BA68C8)",
//                                                 borderRadius: "8px",
//                                                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                                                 "&:hover": {
//                                                     background: "linear-gradient(135deg,rgb(121, 64, 131),rgb(163, 103, 173))",
//                                                     boxShadow: "0px 8px 15px rgba(241, 203, 203, 0.4)",
//                                                     transform: "scale(1.05)",
//                                                     "& .MuiButton-startIcon": {
//                                                         transform: "scale(1.2)",
//                                                         filter: "drop-shadow(0 4px 8px rgba(255, 255, 255, 0.6))",
//                                                     }
//                                                 },
//                                                 "& .MuiButton-startIcon": {
//                                                     fontSize: "24px",
//                                                     transition: "transform 0.3s ease, filter 0.3s ease",
//                                                     filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
//                                                 },
//                                             }}
//                                             startIcon={<FileUploadIcon />}
//                                             onClick={() => console.log("Upload Clicked")}
                                        
//                                         >
//                                             UPLOAD
//                                         </Button>

//                                         <Button
//                                             variant="contained"
//                                             size="small"
//                                             sx={{
//                                                 padding: "10px 12px",
//                                                 fontSize: "15px",
//                                                 background: "linear-gradient(135deg, #8BC34A,rgb(113, 202, 11))",
//                                                 borderRadius: "8px",
//                                                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                                                 "&:hover": {
//                                                     background: "linear-gradient(135deg,rgb(114, 161, 61) , rgb(89, 151, 18))",
//                                                     boxShadow: "0px 8px 15px rgba(238, 207, 207, 0.4)",
//                                                     transform: "scale(1.05)",
//                                                     "& .MuiButton-startIcon": {
//                                                         transform: "scale(1.2)",
//                                                         filter: "drop-shadow(0 4px 8px rgba(255, 255, 255, 0.6))",
//                                                     }
//                                                 },
//                                                 "& .MuiButton-startIcon": {
//                                                     fontSize: "24px",
//                                                     transition: "transform 0.3s ease, filter 0.3s ease",
//                                                     filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
//                                                 },
//                                             }}
//                                             startIcon={<AttachFileIcon />}
//                                             onClick={() => console.log("Sample Clicked")}
                                        
//                                         >
//                                             SAMPLE
//                                         </Button>
//                                     </Box>
//                                 </Box>
//                             </Card>
//                         );
//                     })}
//                 </Box>
//             </Card>


//             <Card
//                 sx={{
//                     boxShadow: "none",
//                     borderRadius: "7px",
//                     mb: "25px",
//                     padding: { xs: "18px", sm: "20px", lg: "25px" },
//                     position: "relative",
//                 }}
//             >
//                 <Typography variant="h5">Department Master</Typography>

//                 <Box>
//                     {loading ? (
//                           <div className="loader"></div> // Show loader
//                         // <Stack sx={{ color: 'grey.500' , textAlign:"center", justifyContent:"center"}} spacing={2} direction="row">
//                         //     <CircularProgress color="secondary" />
//                         // </Stack>
//                         // <Box sx={{ width: '100%' }}>
//                         //     <LinearProgress />
//                         // </Box>
//                         // <Stack spacing={2} direction="row" sx={{ textAlign: "center", justifyContent: "center" }}>
//                         //     <CircularProgress variant="determinate" value={progress} />
//                         // </Stack>
//                     ) : (
//                         <TableContainer component={Paper}>
//                             <Table id="tblCreatorMaster">
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>S.No</TableCell>
//                                         <TableCell>ID</TableCell>
//                                         <TableCell>Name</TableCell>
//                                         <TableCell>Description</TableCell>
//                                         <TableCell>Code</TableCell>
//                                         <TableCell>Head</TableCell>
//                                         <TableCell>Action</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {rowe.map((row) => (
//                                         <TableRow key={row.id}>
//                                             <TableCell>{row.sNo}</TableCell>
//                                             <TableCell>{row.id}</TableCell>
//                                             <TableCell>{row.name}</TableCell>
//                                             <TableCell>{row.description}</TableCell>
//                                             <TableCell>{row.code}</TableCell>
//                                             <TableCell>{row.head}</TableCell>
//                                             <TableCell>
//                                                 <Tooltip title="Edit">
//                                                     <IconButton onClick={() => openEditModal(row)}>
//                                                         <EditIcon />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                                 <Tooltip title="Edit Calendar">
//                                                     <IconButton onClick={() => openEditModale(row)}>
//                                                         <EditCalendarIcon />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                     )}
//                 </Box>
//             </Card>


//             <Box sx={{ margin: "0 auto" }}>
//       <Card
//         sx={{
//           boxShadow: "none",
//           borderRadius: "7px",
//           mb: 2,
//           padding: { xs: "18px", sm: "20px", lg: "25px" },
//         }}
//       >
//         <Typography variant="h6" sx={{ marginBottom: "20px", fontWeight: "bold", fontSize:'20px' }}>
//           User Access
//         </Typography>

//         {/* Radio Buttons */}
//         <FormControl component="fieldset" fullWidth>
//           <RadioGroup
//             row
//             value={selectedPage}
//             onChange={handlePageChange}
//             sx={{ mt: 3, justifyContent: "left" }}
//           >
//             {[
//               { value: "brand", label: "Brand" },
//               { value: "modeltype", label: "Model Type" },
//               { value: "fuel", label: "Fuel" },
//               { value: "vehicle", label: "Vehicle" },
//             ].map((option) => (
//               <FormControlLabel
//                 key={option.value}
//                 value={option.value}
//                 control={
//                   <Radio
//                     sx={{
//                       color: "#4CAF50",
//                       "&.Mui-checked": {
//                         color: "#388E3C",
//                       },
//                     }}
//                   />
//                 }
//                 label={
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         fontWeight: selectedPage === option.value ? "bold" : "normal",
//                         color: selectedPage === option.value ? "#388E3C" : "#000",
//                       }}
//                     >
//                       {option.label}
//                     </Typography>
//                     <Box
//                       sx={{
//                         width: "100%",
//                         height: "4px",
//                         backgroundColor: selectedPage === option.value ? "#4CAF50" : "transparent",
//                         borderRadius: "4px",
//                         transition: "background-color 0.3s ease",
//                       }}
//                     />
//                   </Box>
//                 }
//               />
//             ))}
//           </RadioGroup>
//         </FormControl>
//       </Card>

//       <Card
//         sx={{
//           boxShadow: "none",
//           borderRadius: "7px",
//           mb: 2,
//           padding: { xs: "18px", sm: "20px", lg: "25px" },
//         }}
//       >
//         {selectedPage === "brand" && <Brand />}
//         {selectedPage === "modeltype" && <Modeltype />}
//         {selectedPage === "fuel" && <Fuel />}
//         {selectedPage === "vehicle" && <Vehicle />}
//       </Card>
//       </Box>
//             {/* Edit Modal */}
//             <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} fullWidth maxWidth="lg">
//                 <DialogTitle sx={{ textAlign: "center", fontSize: "22px" }}>Edit Departments</DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={2} marginTop={1} >
//                         {currentRows.map((row, index) => (
//                             <Grid container key={index} spacing={2} sx={{ mb: 2 }}>
//                                 <Grid item xs={3}>
//                                     <TextField
//                                         label="Department Name"
//                                         fullWidth
//                                         value={row.name}
//                                         onChange={(e) => {
//                                             const updatedRows = [...currentRows];
//                                             updatedRows[index].name = e.target.value;
//                                             setCurrentRows(updatedRows);
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={3}>
//                                     <TextField
//                                         label="Description"
//                                         fullWidth
//                                         value={row.description}
//                                         onChange={(e) => {
//                                             const updatedRows = [...currentRows];
//                                             updatedRows[index].description = e.target.value;
//                                             setCurrentRows(updatedRows);
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={3}>
//                                     <TextField
//                                         label="Code"
//                                         fullWidth
//                                         value={row.code}
//                                         onChange={(e) => {
//                                             const updatedRows = [...currentRows];
//                                             updatedRows[index].code = e.target.value;
//                                             setCurrentRows(updatedRows);
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={3}>
//                                     <TextField
//                                         label="Head of Department"
//                                         fullWidth
//                                         value={row.head}
//                                         onChange={(e) => {
//                                             const updatedRows = [...currentRows];
//                                             updatedRows[index].head = e.target.value;
//                                             setCurrentRows(updatedRows);
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={3}>
//                                     <TextField
//                                         label="Head of Department"
//                                         fullWidth
//                                         value={row.head}
//                                         onChange={(e) => {
//                                             const updatedRows = [...currentRows];
//                                             updatedRows[index].head = e.target.value;
//                                             setCurrentRows(updatedRows);
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={3}>
//                                     <TextField
//                                         label="Head of Department"
//                                         fullWidth
//                                         value={row.head}
//                                         onChange={(e) => {
//                                             const updatedRows = [...currentRows];
//                                             updatedRows[index].head = e.target.value;
//                                             setCurrentRows(updatedRows);
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={3}>
//                                     <TextField
//                                         label="Head of Department"
//                                         fullWidth
//                                         value={row.head}
//                                         onChange={(e) => {
//                                             const updatedRows = [...currentRows];
//                                             updatedRows[index].head = e.target.value;
//                                             setCurrentRows(updatedRows);
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={3}>
//                                     <TextField
//                                         label="Head of Department"
//                                         fullWidth
//                                         value={row.head}
//                                         onChange={(e) => {
//                                             const updatedRows = [...currentRows];
//                                             updatedRows[index].head = e.target.value;
//                                             setCurrentRows(updatedRows);
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={3}>
//                                     <TextField
//                                         label="Head of Department"
//                                         fullWidth
//                                         value={row.head}
//                                         onChange={(e) => {
//                                             const updatedRows = [...currentRows];
//                                             updatedRows[index].head = e.target.value;
//                                             setCurrentRows(updatedRows);
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={3}>
//                                     <TextField
//                                         label="Head of Department"
//                                         fullWidth
//                                         value={row.head}
//                                         onChange={(e) => {
//                                             const updatedRows = [...currentRows];
//                                             updatedRows[index].head = e.target.value;
//                                             setCurrentRows(updatedRows);
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={3}>
//                                     <TextField
//                                         label="Head of Department"
//                                         fullWidth
//                                         value={row.head}
//                                         onChange={(e) => {
//                                             const updatedRows = [...currentRows];
//                                             updatedRows[index].head = e.target.value;
//                                             setCurrentRows(updatedRows);
//                                         }}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={3}>
//                                     <TextField
//                                         label="Head of Department"
//                                         fullWidth
//                                         value={row.head}
//                                         onChange={(e) => {
//                                             const updatedRows = [...currentRows];
//                                             updatedRows[index].head = e.target.value;
//                                             setCurrentRows(updatedRows);
//                                         }}
//                                     />
//                                 </Grid>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </DialogContent>
//                 {/* <DialogActions>
//           <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
//           <Button onClick={handleEditSubmit}>Save</Button>
//         </DialogActions> */}

//                 <Box sx={{ textAlign: "center", marginTop: "6px", marginBottom: "16px" }}>
//                     <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => setEditModalOpen(false)} // Close modal
//                         sx={{
//                             textTransform: "uppercase",
//                             fontWeight: "bold",
//                             padding: "8px 16px",
//                         }}
//                     >
//                         Close
//                     </Button>
//                 </Box>
//             </Dialog>



//         </>
//     );
// };

// export default ListData; 




