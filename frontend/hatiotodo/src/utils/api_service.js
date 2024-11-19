import axios from "axios";
import { BASE_URL } from "./config";

const getProjectApi = async (userId) => {
    const response = await axios.get(`${BASE_URL}/project?user_id=${userId}`);
    return response.data;
}

const getTaskApi = async (userId, projectId) => {
    const response = await axios.get(`${BASE_URL}/task?user_id=${userId}&project_id=${projectId}`);
    return response.data;
}

export {getProjectApi, getTaskApi}