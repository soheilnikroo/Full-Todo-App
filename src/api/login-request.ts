import axios from 'axios';

// Set config defaults when creating the instance
const loginRequest = axios.create({
  baseURL: 'http://localhost:5000/api/users/login',
});

export default loginRequest;
