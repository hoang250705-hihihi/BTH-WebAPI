import { MACADDR } from "sequelize";
import { laynhanvienid, nhanvienRepo , laynhanvientheotensdt, laynhanvientheotensdtgioitinh, laynhanvienchinhxac, themnhanvien, suanhanvien, xoanhanvien} from "../repositories/nhanvien.js";

//Lay tat nhan vien
export const getnhanvien = async (req, res) => {
  try {
    const nhanvien = await nhanvienRepo.getNhanvien();
    res.json(nhanvien);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Laynhan vien theo ma
export const getnhanvientheoma = async (req, res) => {
  const id = req.params.id;
  try {
    const nhanvien = await laynhanvienid.getNhanvienById(id);
    res.json(nhanvien);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
// Lay nhan vien theo ten, so dt
export const getnhanvientheoten = async (req, res) => {
  const { ten, sdt } = req.query;
  if (!ten && !sdt) {
    return res.status(400).json({message: "Nhap ten hoac sdt"});
  }
  try {
    const nhanvien = await laynhanvientheotensdt.getNhanvientheotensdt(ten, sdt);
    res.json({soluong: nhanvien.length, data: nhanvien
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
//Lay nhan vien theo ten, so dt, gioi tinh
export const getnhanvientheotensdtgioitinh = async (req, res) => {
  const { ten, sdt, gioitinh } = req.query;
  if (!ten && !sdt && !gioitinh) {
    return res.status(400).json({message: "Nhap ten, sdt hoac gioi tinh"});
  }
  try {
    const nhanvien = await laynhanvientheotensdtgioitinh.getNhanvientheotensdtgioitinh(ten, sdt, gioitinh);
    res.json({soluong: nhanvien.length, data: nhanvien});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
//Lay nhan vien chinh xac 
export const getnhanvienchinhxac = async (req, res) => {
  const {ten, email} = req.query;
  if (!ten && !email) {
    return res.status(400).json({message: "Nhap ten hoac email"});
  }
  try {
    const nhanvien = await laynhanvienchinhxac.getNhanvienchinhxac(ten, email);
    res.json({soluong: nhanvien.length, data: nhanvien});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
//Them nhan vien
export const themnhanvienmoi = async (req, res) => {
  const { manv, ten, gt , ngaysinh, email, sdt } = req.body;
  if (!manv || !ten || !sdt || !email || !ngaysinh || !gt) {
    return res.status(400).json({ message: "Thieu thong tin bat buoc" });
  }
  try {
    const newNhanvien = {maNV : manv,TenNV : ten, GioiTinh : gt ,NgaySinh : ngaysinh, email : email, SDT : sdt};
    const result = await themnhanvien.getThemnhanvien(newNhanvien);
    res.status(201).json({ message: "Them nhan vien thanh cong", data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
    }
}
//Sua nhan vien
export const suanhanvienn = async (req, res) => {
  const id = req.params.id;
  const { manv, ten, gt , ngaysinh, email, sdt } = req.body;
  if (!manv || !ten || !sdt || !email || !ngaysinh || !gt) {
    return res.status(400).json({ message: "Thieu thong tin bat buoc" });
  }
  try {
    const updatedNhanvien = {maNV : manv,TenNV : ten, GioiTinh : gt ,NgaySinh : ngaysinh, email : email, SDT : sdt};
    const result = await suanhanvien.getSuanhanvien(id, updatedNhanvien);
    res.status(200).json({ message: "Sua nhan vien thanh cong", data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
    }
}
//Xoa nhan vien
export const xoanhanvienn = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await xoanhanvien.getXoanhanvien(id);
    res.status(200).json({ message: "Xoa nhan vien thanh cong", data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
    }
}