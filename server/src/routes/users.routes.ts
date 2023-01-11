import { Router } from "express";
import { getUsers, getUserById, addUser, updateUser, removeUser } from "../controllers/users.controller";

const router = Router();

router.get('', getUsers);
router.get('/:userId', getUserById);

router.post('', addUser);

router.patch('/:userId', updateUser);

router.delete('/:userId', removeUser);

export default router;