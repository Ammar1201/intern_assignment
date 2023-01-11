import axios from 'axios';
import { User } from '../interface/User';

let myUrl: string = 'http://localhost:5000/api';

if (process.env.NODE_ENV === 'production') {
  myUrl = '/api';
}

const Api = axios.create({
  baseURL: myUrl,
});

export const getUsersReq = async () => {
  try {
    const res = await Api.get('/users');
    return res.data;
  }
  catch (err: any) {
    return err.message;
  }
};

export const getSpecificUserReq = async (userId: string) => {
  try {
    const res = await Api.get(`/users/${userId}`);
    return res.data;
  }
  catch (err: any) {
    return err.message;
  }
};

export const addUserReq = async (user: User) => {
  try {
    const res = await Api.post(`/users`, user);
    return res.data;
  }
  catch (err: any) {
    return err.message;
  }
};

export const updateUserReq = async (user: User, userId: string) => {
  try {
    const res = await Api.patch(`/users/${userId}`, user);
    return res.data;
  }
  catch (err: any) {
    console.log(err);
    return err.message;
  }
};

export const removeUserReq = async (userId: string) => {
  try {
    const res = await Api.delete(`/users/${userId}`);
    return res.data;
  }
  catch (err: any) {
    console.log(err);
    return err.message;
  }
};