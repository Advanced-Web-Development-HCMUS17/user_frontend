import axios from 'axios';

require('dotenv').config({
  path: '../../.env.example',
})

const API_URL = process.env.REACT_APP_API_URL;

async function register(username, email, password) {
  try {
    const res = await axios.post(`${API_URL}/users/register`, {
      username: username, email: email, password: password
    });
    return res.status === 201;
  } catch (e) {
    const res = e.response;
    const errorData = {"error": res.status};
    if (res.status === 400)
      errorData["message"] = res.data;
    if (res.status === 500)
      errorData["message"] = "Error occur when saving user. Please try again.";
    return errorData;
  }
}

async function login(email, password) {
  try {
    const res = await axios.post(`${API_URL}/users/login`, {email: email, password: password});
    return res.status === 200 ? res.data : null;
  } catch (e) {
    const res = e.response;
    const errorData = {"error": res.status};
    if (res.status === 400)
      errorData["message"] = "Email or password is empty";
    if (res.status === 401)
      errorData["message"] = "Invalid email or password";
    if (res.status === 403)
      errorData["message"] = res.data;
    return errorData;
  }
}

async function getUserInfo(token) {
  try {
    const res = await axios.get(`${API_URL}/users/info`, {
      headers:
        {
          "Authorization": token
        }
    });
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function resetPasswordRequest(email) {
  try {
    const res = await axios.post(`${API_URL}/users/reset-password/request/`, {email: email});
    return res.status === 200;
  } catch (e) {
    const res = e.response;
    const errorData = {"error": res.status};
    if (res.status === 400)
      errorData["message"] = "Please input email address";
    if (res.status === 404)
      errorData["message"] = "Invalid email address";
    return errorData;
  }
}

async function updatePassword(email, code, newPassword) {
  try {
    const res = await axios.post(`${API_URL}/users/reset-password/update/`, {
      email: email,
      secretCode: code,
      newPassword: newPassword
    });
    return res.status === 200;
  } catch (e) {
    const res = e.response;
    const errorData = {"error": res.status};
    if (res.status === 400)
      errorData["message"] = "Please input new password";
    if (res.status === 404)
      errorData["message"] = "Password reset request was expired";
    return errorData;
  }
}

const AccountServices = {login, register, getUserInfo, resetPasswordRequest, updatePassword};
export default AccountServices;
