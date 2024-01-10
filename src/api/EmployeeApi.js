
import baseAxios from "./baseAxios.js";

const ENDPOINT="employee";



export const getAllEmployee = async () => {
    return await baseAxios.get(`${ENDPOINT}`);
}

export const getDetailEmployee = async (id, params = {}) => {
    return await baseAxios.get(`${ENDPOINT}/${id}`, params);
};


export const updateEmployeeApi =  async (employId, params ={}) => {
    return await baseAxios.patch(`${ENDPOINT}/${employId}`, {...params})
}
export const deleteEmployeeApi =  async (employId) => await baseAxios.delete(`${ENDPOINT}/${employId}`)

export const getManager = async () => {
    return await baseAxios.get(`${ENDPOINT}/managers`);
}

export const getTotalEmployee = async () =>{
    return await baseAxios.get(`${ENDPOINT}/total`)
}

export const addEmployeeApi = async (params) => {
    return await baseAxios.post(`employee`, params);
};
export default {
    getDetailEmployee,
    updateEmployeeApi,
    deleteEmployeeApi,
    addEmployeeApi,
    getManager,
    getTotalEmployee

}