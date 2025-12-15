import express from "express";
import { getAllUsers, getUserById } from "../controllers/userController.js";
import { getAllAccounts, getAccountsByTenTK, loginaccount, createAccount, 
  updateAccount, deleteAccount, getAccountsByMota, addAccountAtIndex} from "../controllers/authController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to API route 🚀" });
});

//-----------------------------------Nguoi dung------------------------------------
//lay tat ca thong tin
router.get("/users", getAllUsers);

//Lay theo id
router.get("/users/:id", getUserById);

//-----------------------------------Tai khoan--------------------------------------
//lay tat ca thong tin
router.get("/accounts", getAllAccounts);

//Lay theo id
router.get("/accounts/:tentk", getAccountsByTenTK);

//Kiem tra tai khoan mat khau
router.post("/accounts/login", loginaccount);

//Tao tai khoan moi
router.post("/accounts/create", createAccount);

//Cap nhat tai khoan
router.put("/accounts/update/:tentk", updateAccount);

//Xoa tai khoan
router.delete("/accounts/delete/:tentk", deleteAccount);

//Lay tai khoan theo mo ta
router.get("/accounts/laymota/:mota", getAccountsByMota);

//Them tai khoan moi theo index nhap
router.post("/accounts/createindex/", addAccountAtIndex);

export default router;