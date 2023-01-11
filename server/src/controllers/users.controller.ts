import { Request, Response } from "express";
import { connect } from "../database";
import { LeadStatus } from "../interface/LeadStatus";
import { User } from "../interface/User";

export async function getUsers(req: Request, res: Response): Promise<Response> {
  try {
    const db = await connect();
    const users = await db.query('SELECT * FROM users');
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
    const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    // const leadStatus = await db.query('SELECT * FROM LeadStatus WHERE status_id = ?', [user[0].LeadStatus]);
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

  const LeadStatus: LeadStatus = {
    status_id: randomID,
    status_name: 'A New Lead'
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
    return res.status(200).json(user[0]);
  }
  catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.params.userId;
  const updateUser: User = req.body;

  try {
    const db = await connect();
    const user = await db.query('UPDATE users SET ? WHERE id = ?', [updateUser, userId]);
    return res.status(200).json(user[0]);
  }
  catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};