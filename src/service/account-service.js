import axios from 'axios';

async function register(userName, email, password) {
    console.log(`${process.env.API_URL}/users/register`);
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, {
            userName,
            email,
            password
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
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, { email, password });
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

const funcs = {login, register};
export default funcs;