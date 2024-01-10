import baseAxios from "./baseAxios";

const ENDPOINT = "assign";

export const postAssignApi = async (params = {}) => {
    return await baseAxios.post(`${ENDPOINT}`, params);
}

export const unAssignAPI = async (params) => {
    return await baseAxios.delete(`${ENDPOINT}`, { data: params });
}
export default {
    postAssignApi,
    unAssignAPI
}