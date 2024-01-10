import baseAxios from "./baseAxios.js";

const ENDPOINT="project";


export const postAddProject = async (params = {}) => {
    return await baseAxios.post(`${ENDPOINT}`, params);
};
export const getTotalProject = async (params) =>{
    return await baseAxios.get(`${ENDPOINT}/total`, {params})
}
export const deleteProjectApi =  async (projectId) => await baseAxios.delete(`${ENDPOINT}/${projectId}`)

export default {
    postAddProject,
    getTotalProject
}