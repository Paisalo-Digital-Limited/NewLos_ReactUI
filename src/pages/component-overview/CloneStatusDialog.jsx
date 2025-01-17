// CloneStatusDialog.js
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Box,
    Typography
} from '@mui/material';
import Close from '@mui/icons-material/Close';

const CloneStatusDialog = ({ open, onClose, cloneData }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: "20px",
                    padding: "5px",
                    boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.2)",
                    background: "linear-gradient(135deg, #FFDEE9, #B5FFFC)",
                },
            }}
        >
            <DialogTitle
                sx={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: "#1A202C",
                    borderBottom: "2px solid #EDF2F7",
                    paddingBottom: "16px",
                    marginBottom: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <span>Clone Status</span>
                <Button
                    onClick={onClose}
                    sx={{
                        minWidth: "auto",
                        padding: 0,
                        color: "#2D3748",
                        "&:hover": {
                            color: "#1A202C",
                        },
                    }}
                >
                    <Close fontSize="large" />
                </Button>
            </DialogTitle>
            <DialogContent>
                {cloneData && cloneData.length > 0 ? (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                            gap: "16px",
                            padding: "16px",
                        }}
                    >
                        {cloneData.map((row, index) => (
                            <Box
                                key={index}
                                sx={{
                                    border: "2px solid #E2E8F0",
                                    borderRadius: "16px",
                                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
                                    padding: "16px",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    background: "linear-gradient(135deg, #FFE5B4, #F8BBD0)",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.25)",
                                    },
                                }}
                            >
                                <Typography variant="h6" sx={{ color: "#2D3748", fontWeight: "700", marginBottom: "8px" }}>
                                    SM Code: {row.smCode}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#4A5568", marginBottom: "8px", fontSize: "14px" }}>
                                    <strong>FI Code:</strong> {row.fiCode}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#4A5568", marginBottom: "8px", fontSize: "14px" }}>
                                    <strong>Creator:</strong> {row.creator}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#4A5568", marginBottom: "8px", fontSize: "14px" }}>
                                    <strong>Aadhar No:</strong> {row.aadharNo}
                                </Typography>
                                <Typography variant="body2" sx={{
                                    color: row.approved ? "#2ECC71" : "#E74C3C",
                                    fontWeight: "600",
                                    fontSize: "14px",
                                }}>
                                    {row.approved ? "Approved" : "Not Approved"}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#4A5568", marginTop: "8px", fontSize: "14px" }}>
                                    <strong>Creation Date:</strong>
                                    {row.creationDate ? new Date(row.creationDate).toLocaleDateString() : "-"}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#4A5568", fontSize: "14px" }}>
                                    <strong>Sanction Date:</strong>
                                    {row.sanctionDate ? new Date(row.sanctionDate).toLocaleDateString() : "-"}
                                </Typography>
                                {/* New fields added below */}
                                <Typography variant="body2" sx={{ color: "#4A5568", fontSize: "14px" }}>
                                    <strong>SM Post Date:</strong>
                                    {row.smPostDate ? new Date(row.smPostDate).toLocaleDateString() : "Null"}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#4A5568", fontSize: "14px" }}>
                                    <strong>Loan Completion Date:</strong>
                                    {row.loanCompletionDate ? new Date(row.loanCompletionDate).toLocaleDateString() : "Null"}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Typography
                        variant="body1"
                        sx={{
                            color: "#718096",
                            textAlign: "center",
                            marginTop: "16px",
                            fontSize: "16px",
                        }}
                    >
                        No data available to display.
                    </Typography>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CloneStatusDialog;























































