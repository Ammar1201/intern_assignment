"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.removeUser = exports.addUser = exports.getUserById = exports.getUsers = void 0;
const database_1 = require("../database");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield (0, database_1.connect)();
            const users = yield db.query('SELECT * FROM users');
            return res.status(200).json(users[0]);
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    });
}
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const db = yield (0, database_1.connect)();
        const user = yield db.query('SELECT * FROM users WHERE id = ?', [userId]);
        return res.status(200).json(user[0]);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.getUserById = getUserById;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    try {
        const db = yield (0, database_1.connect)();
        const user = yield db.query('INSERT INTO users SET ?', [newUser]);
        return res.status(201).json(user[0]);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.addUser = addUser;
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const db = yield (0, database_1.connect)();
        const user = yield db.query('DELETE FROM users WHERE id = ?', [userId]);
        return res.status(200).json(user[0]);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.removeUser = removeUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const updateUser = req.body;
    try {
        const db = yield (0, database_1.connect)();
        const user = yield db.query('UPDATE users SET ? WHERE id = ?', [updateUser, userId]);
        return res.status(200).json(user[0]);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.updateUser = updateUser;
