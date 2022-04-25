import axios from 'axios';

// Set config defaults when creating the instance
const signinRequest = axios.create({
  baseURL: 'http://localhost:5000/api/users/signup',
});

export default signinRequest;
