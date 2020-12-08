import axios from 'axios';

async function register(username, email, password) {
  console.log(`${process.env.REACT_APP_API_URL}/users/register`);
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, {
      username: username, email: email, password: password
    });
    if (res.status === 201) {
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

async function login(email, password) {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {email: email, password: password});
    return res.data;
  } catch (e) {
    return null;
  }
}

async function getUserInfo(token) {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/info`, {
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

const AccountServices = {login, register, getUserInfo};
export default AccountServices;
