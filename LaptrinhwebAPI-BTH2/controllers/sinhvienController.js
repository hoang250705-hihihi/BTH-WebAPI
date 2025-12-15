import { sinhvienRepo , laysinhvientheotensinhvien, laysinhvientheodiachi, laysinhvientren20} from "../repositories/sinhvien.js";

//Lay sinh vien
export const getsinhvien = async (req, res) => {
  try {
    const sv = await sinhvienRepo.getSinhvien();
    res.json(sv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Lay sinh vien theo ten sinh vien
export const getsinhvientheotensinhvien = async (req, res) => {
    const { tensv } = req.query;
    if (!tensv) {
        return res.status(400).json({ message: "Nhap ten sinh vien" });
    }
    try {
        const sv = await laysinhvientheotensinhvien.getSinhvientheoten(tensv);
        res.json(sv);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
//Lay sinh vien theo dia chi
export const getsinhvientheodiachi = async (req, res) => {
    const { diachi } = req.query;
    if (!diachi) {
        return res.status(400).json({ message: "Nhap dia chi" });
    }
    try {
        const sv = await laysinhvientheodiachi.getSinhvientheodiachi(diachi);
        res.json(sv);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
//Lay sinh vien tren 20 tuoi
export const getsinhvientren20 = async (req, res) => {
    try {
        const sv = await laysinhvientren20.getSinhvientren20();
        res.json(sv);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}