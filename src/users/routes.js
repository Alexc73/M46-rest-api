const { Router } = require("express");

const userRouter = Router();

const { registerUser, getAllUsers, updateUser, deleteUser, login } = require("./controllers");
const { hashPass, comparePass, tokenCheck } = require("../middleware");

userRouter.post("/users/register", hashPass, registerUser);

userRouter.post("/users/login", comparePass, login);

userRouter.get("/users/getUsers", tokenCheck, getAllUsers); // protected endpoint

userRouter.get("/users/authCheck", tokenCheck, login);

userRouter.put("/users/updateUser", updateUser);

userRouter.delete("/users/deleteUser", deleteUser);

module.exports = userRouter;
