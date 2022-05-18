import axios from 'axios';
import { BASE_URL } from './baseUrl';

// Set config defaults when creating the instance
const loginRequest = axios.create({
  baseURL: `${BASE_URL}/users/login`,
});

export default loginRequest;
