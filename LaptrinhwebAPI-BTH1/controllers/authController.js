
import { HasMany } from "sequelize";
import { accounts} from "../model/account.js";

// Lay tat ca tai khoan
export const getAllAccounts = (req, res) => {
    res.status(200).json(accounts)
}

//Lay tai khoan theo mo ta
export const getAccountsByMota = (req, res) => {
    const mota = req.params.mota;
    const account = accounts.find((u => u.Mota === mota))
    if (!account) {
        res.status(404).json({message:"account by ${mota} not found"})
    }
    res.status(200).json(account);
}

// Lay tai khoan theo ten tai khoan
export const getAccountsByTenTK = (req, res) => {
    const tentk = req.params.tentk;
    const account = accounts.find((u => u.TenTK === tentk))

    if (!account) {
        res.status(404).json({
          status: 404,
          message:"account by ${tentk} not found"
        })
    }
    res.status(200).json(account);
}

//Kiem tra tai khoan mat khau co hop le
export const loginaccount = (req, res) => {
    const { TenTK, MatKhau } = req.body;
    //Kiem tra tai khoan mat khau
    if(!TenTK || !MatKhau){
        return res.status(400).json({ message: "Vui long nhap tai khoan va mat khau" });
    }
    //Tim tai khoan
    const account = accounts.find((u) => u.TenTK === TenTK);
    if(!account){
        return res.status(401).json({ message: "Tai khoan khong dung" });
    }
    //Kiem tra mat khau
    if(account.MatKhau !== MatKhau){
        return res.status(401).json({ message: "Mat khau khong dung" });
    }
    //Dang nhap thanh cong
    res.status(200).json({ message: "Dang nhap thanh cong", data : {
        TenTK: account.TenTK,
        Mota: account.Mota
    } });
}

//Them thong tin tai khoan moi
export const createAccount = (req, res) => {
    const { TenTK, MatKhau, Mota } = req.body;
    //Kiem tra du lieu dau vao
    if(!TenTK || !MatKhau || !Mota){
        return res.status(400).json({ message: "Vui long nhap day du thong tin" });
    }
    //Kiem tra tai khoan da ton tai
    const kiemtrataikhoan = accounts.find((u) => u.TenTK === TenTK);
    if(kiemtrataikhoan){
        return res.status(409).json({ message: "Tai khoan da ton tai" });
    }
    //Tao tai khoan moi
    const taotaikhoan = { TenTK, MatKhau, Mota };
    accounts.push(taotaikhoan);
    res.status(201).json({ message: "Tao tai khoan thanh cong", data: taotaikhoan });
}

//Sua thong tin tai khoan
export const updateAccount = (req, res) => {
    const tentk = req.params.tentk;
    const {MatKhau, Mota } = req.body;
    const thongtintaikhoan = accounts.findIndex((u) => u.TenTK === tentk);
    if(!thongtintaikhoan === -1){
        return res.status(404).json({ message: "Tai khoan khong ton tai" });
    }

    accounts[thongtintaikhoan] = { 
        TenTK : tentk,
        MatKhau : MatKhau || accounts[thongtintaikhoan].MatKhau,
        Mota : Mota || accounts[thongtintaikhoan].Mota};
    res.status(200).json({ message: "Cap nhat tai khoan thanh cong", data: accounts[thongtintaikhoan] });
}

//Xoa tai khoan
export const deleteAccount = (req, res) => {const tentk = req.params.tentk;
    const thongtintaikhoan = accounts.findIndex((u) => u.TenTK === tentk);
    
    if(thongtintaikhoan === -1){
        return res.status(404).json({ message: "Tai khoan khong ton tai" });
    }
    accounts.splice(thongtintaikhoan, 1);
    res.status(200).json({ message: "Xoa tai khoan thanh cong" });
}

//Them tai khoan moi tai vi tri index
export const addAccountAtIndex = (req, res) => {
    const { TenTK, MatKhau, Mota, index } = req.body;
    if(!TenTK || !MatKhau || !Mota || index === undefined){
        return res.status(400).json({ message: "Vui long nhap day du thong tin" });
    }

    const kiemtrataikhoan = accounts.find((u) => u.TenTK === TenTK);
    if(kiemtrataikhoan){
        return res.status(409).json({ message: "Tai khoan da ton tai" });
    }

    if(index < 0 || index > accounts.length){
        return res.status(400).json({ message: "Index khong hop le" });
    }
    const taotaikhoan = { TenTK, MatKhau, Mota };
    accounts.splice(index, 0, taotaikhoan);
    res.status(201).json({ message: 'Tao tai khoan thanh cong tai vi tri {0}', index, data: taotaikhoan });
}