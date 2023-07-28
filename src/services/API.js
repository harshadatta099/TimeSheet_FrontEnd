import axios from 'axios';

const BASE_URL = 'http://localhost:5070';

const endpoints = {
  getUserDataByUserId: (userId) => `${BASE_URL}/NewUser/getUserDataByUserid?userid=${userId}`,
  editTaskByTimesheetId: (timesheetId) => `${BASE_URL}/NewUser/editTaskByTimesheetid?timesheetId=${timesheetId}`,
  deleteTimesheetByTimesheetId: (timesheetId) => `${BASE_URL}/NewUser/deleteTaskByTimesheetid?Timesheetid=${timesheetId}`,
  getTotalHoursWorked: (userId, date) => `${BASE_URL}/NewUser/getTotalHoursWorked?userid=${userId}&date=${date}`,
  getAllUsers: () => `${BASE_URL}/Admin/getAllUsers`,
  getAllTimesheets: () => `${BASE_URL}/Hr/GetAllTimesheets`,
  getAllTimesheetsbyId: (userId) => `${BASE_URL}/Hr/getTimeSheetsByUserId?userid=${userId}`,
  getAllProjects: () => `${BASE_URL}/Admin/getAllProjects`,
  getAllActivities: () => `${BASE_URL}/Admin/getAllActivities`,
  addActivity: () => `${BASE_URL}/Admin/addActivity`, 
  deleteActivity: () => `${BASE_URL}/Admin/deleteActivity`, 
  
};

const fetchData = async (url, method, data = null) => {
  try {
    const response = await axios({ url, method, data });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const fetchFromEndpoint = async (endpoint, method = 'GET', data = null) => {
  const url = endpoints[endpoint](data);
  return fetchData(url, method, data);
};

export const fetchUserDataByUserId = (userId) => fetchFromEndpoint('getUserDataByUserId', 'GET', { userId });
export const editTaskByTimesheetId = (timesheetId, task) => fetchFromEndpoint('editTaskByTimesheetId', 'PUT', { timesheetId, task });
export const deleteTimesheetByTimesheetId = (timesheetId) => fetchFromEndpoint('deleteTimesheetByTimesheetId', 'DELETE', { timesheetId });
export const getTotalHoursWorked = (userId, date) => fetchFromEndpoint('getTotalHoursWorked', 'GET', { userId, date });
export const fetchAllUsers = () => fetchFromEndpoint('getAllUsers');
export const fetchAllTimesheets = () => fetchFromEndpoint('getAllTimesheets');
export const fetchAllTimesheetsbyId = (userId) => fetchFromEndpoint('getAllTimesheetsbyId', 'GET', { userId });
export const fetchAllProjects = () => fetchFromEndpoint('getAllProjects');
export const fetchAllActivities = () => fetchFromEndpoint('getAllActivities');
export const addProject = (project) => fetchFromEndpoint('addAllProjects', 'POST', project);
export const addActivity = (activity) => fetchFromEndpoint('addActivity', 'POST', activity); 
export const deleteProject = async (data) => fetchFromEndpoint('deleteProject', 'DELETE', data);
export const deleteActivity = async (data) => fetchFromEndpoint('deleteActivity', 'DELETE', data); 