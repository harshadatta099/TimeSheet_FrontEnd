import axios from 'axios';

const BASE_URL = 'http://localhost:5070';

const endpoints = {
  getUserDataByUserId: (userId) => `${BASE_URL}/GetUserDataByUserid?userid=${userId}`,
  editTaskByTimesheetId: (timesheetId) => `${BASE_URL}/EditTaskByTimesheetId?timesheetId=${timesheetId}`,
  deleteTimesheetByTimesheetId: (timesheetId) => `${BASE_URL}/DeleteTaskByTimesheetId?Timesheetid=${timesheetId}`,
  getTotalHoursWorked: (userId, date) => `${BASE_URL}/GetTotalHoursWorked?userid=${userId}&date=${date}`,
  getAllUsers: () => `${BASE_URL}/api/Hr/GetAllUsers`,
  getAllTimesheets: () => `${BASE_URL}/api/Hr/GetAllTimesheets`,
  getAllTimesheetsbyId: (userId) => `${BASE_URL}/api/Hr/GetTimeSheetsByUserId?userid=${userId}`,
  getAllProjects: () => `${BASE_URL}/GetAllProjects`,
  getAllActivities: () => `${BASE_URL}/GetAllActivities`,

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

export const fetchUserDataByUserId = async (userId) => {
  const url = endpoints.getUserDataByUserId(userId);
  return fetchData(url, 'GET');
};

export const editTaskByTimesheetId = async (timesheetId, task) => {
  const url = endpoints.editTaskByTimesheetId(timesheetId);
  return fetchData(url, 'PUT', task);
};

export const deleteTimesheetByTimesheetId = async (timesheetId) => {
  const url = endpoints.deleteTimesheetByTimesheetId(timesheetId);
  return fetchData(url, 'DELETE');
};

export const getTotalHoursWorked = async (userId, date) => {
  const url = endpoints.getTotalHoursWorked(userId, date);
  return fetchData(url, 'GET');
};

export const fetchAllUsers = async () => {
  const url = endpoints.getAllUsers();
  return fetchData(url, 'GET');
};

export const fetchAllTimesheets = async () => {
  const url = endpoints.getAllTimesheets();
  return fetchData(url, 'GET');
};

export const fetchAllTimesheetsbyId = async (userId) => {
  const url = endpoints.getAllTimesheetsbyId(userId);
  return fetchData(url, 'GET');
};

export const fetchAllProjects = async () => {
  const url = endpoints.getAllProjects();
  return fetchData(url);
};

export const fetchAllActivities = async () => {
  const url = endpoints.getAllActivities();
  return fetchData(url);
};

