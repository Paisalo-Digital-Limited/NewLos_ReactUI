import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tooltip,
  Switch,
  Card,
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import MainCard from 'components/MainCard';
import ComponentSkeleton from '../component-overview/ComponentSkeleton';
import axios from 'axios';

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'empCode', label: 'Employee Code' },
  { id: 'departmentName', label: 'Department' },
  { id: 'roleName', label: 'Role' },
  { id: 'reportingName', label: 'Manager Name' },
  { id: 'MobileNo', label: 'Mobile No' },
  { id: 'isActive', label: 'Active Status' },
  { id: 'action', label: 'Actions' },
];

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://apiuat.paisalo.in:4015/admin/api/User/GetUsers');
        if (response.data.statuscode === 200) {
          setEmployees(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("Error fetching employees: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handlePageChange = (event, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ComponentSkeleton>
      <MainCard>
        <Card
          sx={{
            boxShadow: 'none',
            borderRadius: '7px',
            mb: '10px',
          }}
        >
          <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div style={{ color: 'red' }}>{error}</div>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((col) => (
                      <TableCell
                        key={col.id}
                        sx={{
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          background: '#ff4c4c',
                          color: 'white',
                          textAlign: 'center',
                        }}
                      >
                        {col.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.empCode}</TableCell>
                      <TableCell align="center">{row.departmentName}</TableCell>
                      <TableCell align="center">{row.roleName}</TableCell>
                      <TableCell align="center">{row.reportingName}</TableCell>
                      <TableCell align="center">{row.mobileNo || 'N/A'}</TableCell>
                      <TableCell align="center">
                        <Switch
                          checked={row.isActive}
                          sx={{
                            '& .MuiSwitch-switchBase': {
                              '&.Mui-checked': {
                                '& .MuiSwitch-thumb': {
                                  background: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
                                },
                              },
                              '&:not(.Mui-checked) .MuiSwitch-thumb': {
                                background: 'red',
                              },
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          <Tooltip title="Edit">
                            <Button
                              color="secondary"
                              sx={{ fontSize: '9px' }}
                              onClick={() => alert(`Edit Employee ID: ${row.id}`)} // Simulated action for demonstration
                            >
                              <CheckIcon />
                            </Button>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={employees.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
            />
          </TableContainer>
        </Card>
      </MainCard>
    </ComponentSkeleton>
  );
};

export default EmployeeList;