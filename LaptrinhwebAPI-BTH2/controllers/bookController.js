import { bookRepo, laysachtheotensach , laysachtheotentacgia, laysachtheonxb, laysachtheonamxb} from "../repositories/book.js";

//Lay thong tin book
export const getbook = async (req, res) => {
  try {
    const sach = await bookRepo.getBook();
    res.json(sach);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//lay sach theo ten sach
export const getsachtheotensach = async (req, res) => {
    const { tensach } = req.query;
    if (!tensach) {
        return res.status(400).json({ message: "Nhap ten sach" });
    }
    try {
        const sach = await laysachtheotensach.getSachtheotensach(tensach);
        res.json(sach);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
//lay sach theo ten tac gia
export const getsachtheotentacgia = async (req, res) => {
    const { tentacgia } = req.query;
    if (!tentacgia) {
        return res.status(400).json({ message: "Nhap ten tac gia" });
    }
    try {
        const sach = await laysachtheotentacgia.getSachtheotentacgia(tentacgia);
        res.json(sach);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
//lay sach theo nxb
export const getsachtheonxb = async (req, res) => {
    const { nxb } = req.query;
    if (!nxb) {
        return res.status(400).json({ message: "Nhap ten nha xuat ban" });
    }
    try {
        const sach = await laysachtheonxb.getSachtheonxb(nxb);
        res.json(sach);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
//lay sach theo nam xb (15 nam gan day)
export const getsachtheonamxb = async (req, res) => {
    try {
        const sach = await laysachtheonamxb.getSachtheonamxb();
        res.json(sach);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}