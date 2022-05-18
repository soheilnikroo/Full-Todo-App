import axios from 'axios';
import { BASE_URL } from './baseUrl';

// Set config defaults when creating the instance
const signinRequest = axios.create({
  baseURL: `${BASE_URL}/users/signup`,
});

export default signinRequest;
