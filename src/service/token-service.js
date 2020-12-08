const USER_INFO_KEY = 'userInfo';

const setToken = (token) => {
  return localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_OBJECT_NAME, token);
}

const getToken = () => {
  return localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_OBJECT_NAME) || null;
}

const getUserID = () => {
  localStorage.getItem(USER_INFO_KEY);
};


const setUserId = (userInfo) => {
  return localStorage.setItem(USER_INFO_KEY, userInfo);
}

const deleteToken = () => {
  return localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_OBJECT_NAME);
}

const TokenServices = {setToken, getUserID, getToken, deleteToken};
export default TokenServices;
