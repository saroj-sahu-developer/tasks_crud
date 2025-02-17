import axios from "axios";
import { API_BASE_URL } from "../constants";

const urlPath = (path) => {
  return API_BASE_URL + path;
};

export const get = async (path) => {
  try {
    const response = await axios.get(urlPath(path));
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const post = async (path, params) => {
  try {
    const response = await axios.post(urlPath(path), params);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const put = async (path, params) => {
  try {
    const response = await axios.put(urlPath(path), params);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const del = async (path) => {
  try {
    const response = await axios.delete(urlPath(path));
    return response;
  } catch (error) {
    throw error;
  }
};