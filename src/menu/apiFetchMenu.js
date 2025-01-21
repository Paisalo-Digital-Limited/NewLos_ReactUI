import axios from "axios";
import apiClient from "./apiClient";

const BASE_URL = "https://apiuat.paisalo.in:4015";

export const getMenuList = async () => {
  try {
    const response = await apiClient.get(`${BASE_URL}/admin/api/Menu/GetMenuData`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getMainMenuList = async () => {
  try {
    const response = await apiClient.get(`${BASE_URL}/admin/api/Menu/GetMainMenu`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getSubMenuList = async (ParentId) => {
  try {
    const response = await apiClient.get(`${BASE_URL}/admin/api/menu/GetSubMenuList`, {
      params: { ParentId },
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const insertMenuData = async (menuVM) => {
  try {
    const response = await apiClient.post(`${BASE_URL}/admin/api/Menu/InsertMenuData`, menuVM);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getRoleFetchApi = async () => {
  try {
    const response = await apiClient.get(`${BASE_URL}/admin/api/Masters/GetRoles`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const assignRolePermissionPage = async (selectedRows, roleId, userid, rows) => {
  try {
    const obj = selectedRows.map((rowId) => {
      const row = rows.find((r) => r.id === rowId);
      return {
        PageMasterId: rowId,
        RoleId: parseInt(roleId),
        userid: userid,
      };
    });

    const response = await axios.post(`${BASE_URL}/admin/api/Menu/AssignUserRolePage`, obj);
    return response.data;
  } catch (error) {
    console.error("Error submitting data:", error);
    throw new Error(`Failed to assign role permission:`);
  }
};

export const updateMainMenuData = async (menuVM) => {
  try {
    const response = await apiClient.post(`${BASE_URL}/admin/api/Menu/UpdateMenuData`, menuVM);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getMenuPermissionList = async (RoleId) => {
  try {
    const response = await apiClient.get(`${BASE_URL}/admin/api/Menu/GetPermissionPageMaster`, {
      params: { RoleId },
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const deleteMainMenuData = async (menuVM) => {
  try {
    const response = await apiClient.post(`${BASE_URL}/admin/api/Menu/DeleteMenuData`, menuVM);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getMainMenuDetailsForList = async () => {
  try {
    const response = await apiClient.get(`${BASE_URL}/admin/api/Menu/GetMainMenuDetails`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getMainMenuListDetails = async (params) => {
  try {
    const response = await apiClient.get(`${BASE_URL}/admin/api/Menu/GetMainMenuListData`, {
      params: {
        pageSize: params.pageSize,
        pageNumber: params.pageNumber,
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const handleError = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("API Response Error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Axios Error:", error.message);
    }
  } else {
    console.error("Unexpected error:", error);
  }
};