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

async function loginByToken(token) {
  try {
    const res = await axios.get(`${API_URL}/users/info`, {headers: {"Authorization": token}});
    return {token: token, userInfo: res.data};
  } catch (e) {
    return {"error": e.response.status, "message": "Invalid login request"};
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

async function getBoardList(token) {
  try {
    const res = await axios.get(`${API_URL}/users/saved-games`, {headers: {"Authorization": token}});
    return res.data.games;
  } catch (e) {
    const res = e.response;
    return {"error": res.status, "message": res.message};
  }
}

async function updateAvatar(token, file) {
  try {
    const formData = new FormData();
    formData.append('avatar', file);
    const res = await axios.post(`${API_URL}/users/update/avatar`, formData, {
      headers: {
        "Authorization": token,
        'content-type': 'multipart/form-data'
      }
    });
    return {data: res.data, message: "Updated avatar successfully"};
  } catch (e) {
    const res = e.response;
    return {error: res.status, message: "Error occurred. Please tra again."};
  }
}

const AccountServices = {
  login,
  loginByToken,
  register,
  getUserInfo,
  resetPasswordRequest,
  updatePassword,
  getBoardList,
  updateAvatar,
};
export default AccountServices;
