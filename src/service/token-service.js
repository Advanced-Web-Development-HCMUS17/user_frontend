import JWT from 'jsonwebtoken';

const setToken = (token) => {
    return localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_OBJECT_NAME, token);
}

const getToken = () => {
    return localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_OBJECT_NAME) || null;
}

const getUserID = () => {
    const token = getToken();
    console.log("local token", token);
    if (!token)
        return null;
    const payload = JWT.verify(token, process.env.REACT_APP_JWT_SECRETKEY);
    return payload.sub;
};

const deleteToken = () => {
    return localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_OBJECT_NAME);
}

const funcs = {setToken, getUserID, getToken, deleteToken};
export default funcs;