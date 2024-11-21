import axios from "axios";
import { BASE_URL } from "./config";

const getProjectApi = async (userId) => {
    const response = await axios.get(`${BASE_URL}/project?user_id=${userId}`);
    return response.data;
}
const updateProjectApi = async (userId, projectId, title) => {
    const response = await axios.put(`${BASE_URL}/project?user_id=${userId}&project_id=${projectId}`, {title: title});
    return response.data
}
const createProjectApi = async (userId, title) => {
    const response = await axios.post(`${BASE_URL}/project?user_id=${userId}`, {title: title});
    return response.data;
}

const getTaskApi = async (userId, projectId) => {
    const response = await axios.get(`${BASE_URL}/task?user_id=${userId}&project_id=${projectId}`);
    return response.data;
}
const addTaskApi = async (userId, projectId, description) => {
    const response = await axios.post(`${BASE_URL}/task?user_id=${userId}&project_id=${projectId}`, {description: description});
    return response.data;
}
const taskUpdateApi = async (userId, taskId) => {
    const response = await axios.get(`${BASE_URL}/task-update?user_id=${userId}&todo_id=${taskId}`);
    return response.data;
}
const deleteTaskApi = async (userId, taskId) => {
    const response = await axios.delete(`${BASE_URL}/task?user_id=${userId}&todo_id=${taskId}`);
    return response.data;
}
const updateTaskNameApi = async (userId, taskId, description) => {
    const response = await axios.put(`${BASE_URL}/task?user_id=${userId}&todo_id=${taskId}`, {description: description});
    return response.data;
}

const exportTaskApi = async (userId, projectId) => {
    const response = await axios.get(`${BASE_URL}/project-summary?user_id=${userId}&project_id=${projectId}`);
    return response.data;
}

export {getProjectApi, getTaskApi, addTaskApi, updateProjectApi, createProjectApi, taskUpdateApi, deleteTaskApi, updateTaskNameApi, exportTaskApi}