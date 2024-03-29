"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const router = (0, express_1.Router)();
router.get('', users_controller_1.getUsers);
router.get('/:userId', users_controller_1.getUserById);
router.post('', users_controller_1.addUser);
router.patch('/:userId', users_controller_1.updateUser);
router.delete('/:userId', users_controller_1.removeUser);
exports.default = router;
