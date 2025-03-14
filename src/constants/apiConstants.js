import { UrlBuilder } from "../helpers/UrlBuilder";

export const API_BASE_URL = UrlBuilder.taskManagerApi();

export const AUTH_API = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  LOGOUT: `${API_BASE_URL}/logout`,
};

export const TASK_API = {
  FETCH: `${API_BASE_URL}/tasks`,
  CREATE: `${API_BASE_URL}/tasks`,
  UPDATE: (id) => `${API_BASE_URL}/tasks/${id}`,
  DELETE: (id) => `${API_BASE_URL}/tasks/${id}`,
};
