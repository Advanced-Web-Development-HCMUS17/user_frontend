import React, {useContext, useEffect, useState} from "react";

import AccountServices from '../service/account-service';

const LS_TOKEN_KEY = 'token';

const AuthContext = React.createContext(
  {
    isAuth: false,
    token: '',
    userInfo: {},
    setToken: () => {
    },
    setUserInfo: () => {

    },
    login: (token, userInfo) => {
    },
    logout: () => {
    }
  }
);


const {Provider} = AuthContext;

export function AuthProvider({children}) {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isAuth, setIsAuth] = useState(null);

  async function fetchUserInfo(token) {
    const userInfo = await AccountServices.getUserInfo(token);
    if (userInfo) {
      setUserInfo(userInfo);
      setToken(token);
      setIsAuth(true);
    } else {
      setToken(null);
      setIsAuth(false);
      setUserInfo(null);
    }
  }

  function login(token, userInfo) {
    setToken(token);
    localStorage.setItem(LS_TOKEN_KEY, token);
    setUserInfo(userInfo);
    setIsAuth(true);
  }

  function logout() {
    localStorage.removeItem(LS_TOKEN_KEY);
    setUserInfo(null);
    setIsAuth(false);
  }

  useEffect(() => {
    const storageToken = localStorage.getItem(LS_TOKEN_KEY);
    if (storageToken && storageToken.length > 0) {
      fetchUserInfo(storageToken);
    } else {
      setToken(null);
      setUserInfo(null);
      setIsAuth(false);
    }
  }, []);

  return (
    <Provider value={{
      token: token,
      userInfo: userInfo,
      setToken: setToken,
      setUserInfo: setUserInfo,
      login: login,
      logout: logout,
      isAuth: isAuth
    }}>{children}</Provider>)
}

export const useAuth = () => useContext(AuthContext);
