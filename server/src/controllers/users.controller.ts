import { Request, Response } from "express";
import { connect } from "../database";
import { LeadStatus } from "../interface/LeadStatus";
import { User } from "../interface/User";

export async function getUsers(req: Request, res: Response): Promise<Response> {
  try {
    const db = await connect();
    const users = await db.query('SELECT users.*, LeadStatus.status_name FROM users INNER JOIN LeadStatus ON users.LeadStatus=LeadStatus.status_id');
    return res.status(200).json(users[0]);
  }
  catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.params.userId;

  try {
    const db = await connect();
    const user = await db.query('SELECT users.*, LeadStatus.status_name FROM users INNER JOIN LeadStatus ON users.LeadStatus=LeadStatus.status_id WHERE users.id = ?', [userId]);
    return res.status(200).json(user[0]);
  }
  catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const addUser = async (req: Request, res: Response): Promise<Response> => {
  const newUser: User = req.body;
  const randomID: number = Math.floor(Math.random() * 10000);
  newUser.LeadStatus = randomID;

  let status_name = null;

  if (newUser.status_name || newUser.status_name === '') {
    status_name = newUser.status_name;
    delete newUser.status_name;
  }

  const LeadStatus: LeadStatus = {
    status_id: randomID,
    status_name: status_name || 'A New Lead'
  }

  try {
    const db = await connect();
    const user = await db.query('INSERT INTO users SET ?', [newUser]);
    await db.query('INSERT INTO LeadStatus SET ?', [LeadStatus]);
    return res.status(201).json(user[0]);
  }
  catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const removeUser = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.params.userId;

  try {
    const db = await connect();
    const user = await db.query('DELETE FROM users WHERE id = ?', [userId]);
    await db.query('DELETE FROM LeadStatus WHERE status_id = ?', [userId]);
    return res.status(200).json(user[0]);
  }
  catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.params.userId;
  const updateUser: User = req.body;

  let status_name = null;

  if (updateUser.status_name || updateUser.status_name === '') {
    status_name = updateUser.status_name;
    delete updateUser.status_name;
  }

  const values = Object.entries(updateUser);
  const updates: any = {};

  for (let i = 0; i < values.length; i++) {
    if (values[i][1] !== '') {
      updates[values[i][0]] = values[i][1];
    }
  }

  try {
    const db = await connect();
    await db.query('UPDATE users SET ? WHERE id = ?', [updates, userId]);
    if (status_name) {
      await db.query('UPDATE LeadStatus SET status_name = ? WHERE status_id = ?', [status_name, updateUser.LeadStatus]);
    }
    const user = await db.query('SELECT users.*, LeadStatus.status_name FROM users INNER JOIN LeadStatus ON users.LeadStatus=LeadStatus.status_id WHERE users.id = ?', [userId]);
    return res.status(200).json(user[0]);
  }
  catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};