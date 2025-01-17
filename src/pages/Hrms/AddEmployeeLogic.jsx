// src/components/AddEmployeeLogic.js

import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from './axiosInstance'; // Adjust the path as necessary
import Swal from 'sweetalert2';

const useAddEmployeeLogic = () => {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [roles, setRoles] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: 'dotnetdev1@paisalo.in',
        password: '',
        gender: '',
        department: '',
        designation: '',
        role: '',
        reporting: '',
        creator: '',
        branchCode: '',
        dob: '',
        motherFirstName: '',
        motherLastName: '',
        fatherLastName: '',
        permanentAddress: '',
        currentAddress: '',
        mobileNumber: '',
        category: '',
        religion: '',
        bloodGroup: '',
        maritalStatus: '',
        spouseFirstName: '',
        spouseLastName: '',
        fiSourcing: false,
        sameAsPermanent: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const fetchCreators = async () => {
        try {
            const response = await fetch('https://apiuat.paisalo.in:4015/admin/api/Masters/GetCreator');
            const data = await response.json();
            if (data.statuscode === 200) {
                setCreators(data.data);
            } else {
                setError(data.message || "Failed to fetch creators");
            }
        } catch (error) {
            setError("Error fetching creators: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/Masters/GetRoles');
            if (response.status === 200) {
                setRoles(response.data.data);
            } else {
                throw new Error("Failed to fetch roles");
            }
        } catch (error) {
            handleFetchingError(error, 'roles');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDesignations = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/Masters/GetDesignationDetails');
            if (response.status === 200) {
                setDesignations(response.data.data);
            } else {
                throw new Error("Failed to fetch designations");
            }
        } catch (error) {
            handleFetchingError(error, 'designations');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDepartments = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/Masters/GetDepartmentDetails');
            if (response.status === 200) {
                setDepartments(response.data.data);
            } else {
                throw new Error("Failed to fetch departments");
            }
        } catch (error) {
            handleFetchingError(error, 'departments');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFetchingError = (error, type) => {
        if (axios.isAxiosError(error)) {
            setErrors(prev => ({ ...prev, [type]: error.response?.data?.message || "Something went wrong" }));
        } else {
            setErrors(prev => ({ ...prev, [type]: "Something went wrong" }));
        }
        console.error(`Error fetching ${type}:`, error);
    };

    useEffect(() => {
        fetchCreators();
        fetchRoles();
        fetchDesignations();
        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async () => {
        const newErrors = {};
        let hasError = false;

        // Define required fields
        const requiredFields = [
            "firstName", "lastName", "email", "password", "gender", "designation",
            "department", "role", "reporting", "creator", "branchCode",
            "motherFirstName", "motherLastName", "fatherLastName",
            "permanentAddress", "currentAddress", "mobileNumber", "category",
            "religion", "bloodGroup", "maritalStatus",
        ];

        // Check for required fields
        requiredFields.forEach((field) => {
            const value = formData[field];
            if (typeof value === "string" && value.trim() === "") {
                newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
                hasError = true;
            }
        });

        // Validate spouse fields only if marital status is "Married"
        if (formData.maritalStatus === "Married") {
            if (!formData.spouseFirstName) {
                newErrors.spouseFirstName = "Spouse first name is required when marital status is married";
                hasError = true;
            }
            if (!formData.spouseLastName) {
                newErrors.spouseLastName = "Spouse last name is required when marital status is married";
                hasError = true;
            }
        }

        setErrors(newErrors);

        if (!hasError) {
            const payload = {
                // Define your payload according to your API specs here
            };

            try {
                const response = await axiosInstance.post('https://apiuat.paisalo.in:4015/admin/api/User/InsertEmpDetails', payload);
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Insert successful!',
                    });

                    // Reset form data
                    setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        gender: "",
                        designation: "",
                        department: "",
                        role: "",
                        reporting: "",
                        creator: "",
                        branchCode: "",
                        motherFirstName: "",
                        motherLastName: "",
                        fatherLastName: "",
                        permanentAddress: "",
                        currentAddress: "",
                        mobileNumber: "",
                        category: "",
                        religion: "",
                        bloodGroup: "",
                        maritalStatus: "",
                        spouseFirstName: "",
                        spouseLastName: "",
                        dob: ""
                    });
                    setErrors({});
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to insert data. Please try again later.',
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while submitting the form. Please try again.',
                });
                console.error("Error while submitting form:", error);
            }
        }
    };

    return {
        formData,
        loading,
        creators,
        roles,
        designations,
        departments,
        error, // Include error in the return statement
        errors,
        handleChange,
        handleSubmit,
    };
};

export default useAddEmployeeLogic;