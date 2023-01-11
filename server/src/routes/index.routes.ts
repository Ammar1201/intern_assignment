import { Router } from "express";
import usersRoute from './users.routes';
import { connect } from "../database";

const router = Router();

router.use('/users', usersRoute);

router.get('/leads', async (req, res) => {
  const db = await connect();
  const users = await db.query('SELECT * FROM LeadStatus');
  return res.status(200).json(users[0]);
});

export default router;