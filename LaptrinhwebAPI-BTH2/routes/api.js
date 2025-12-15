import express from "express";
import { getUsers } from "../controllers/userController.js";
import { getnhanvien, getnhanvientheoma, getnhanvientheoten, getnhanvientheotensdtgioitinh, getnhanvienchinhxac, themnhanvienmoi, suanhanvienn, xoanhanvienn} from "../controllers/nhanvienController.js";
import { getbook, getsachtheotensach, getsachtheotentacgia, getsachtheonxb, getsachtheonamxb} from "../controllers/bookController.js";
import { getsinhvien, getsinhvientheotensinhvien, getsinhvientheodiachi, getsinhvientren20} from "../controllers/sinhvienController.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to API route" });
});

// -----------------------users---------------------------
router.get("/users/", getUsers);
// -----------------------nhanvien---------------------------
router.get("/nhanvien/", getnhanvien); 
router.get("/nhanvien/timkiem1", getnhanvientheoten); 
router.get("/nhanvien/timkiem2", getnhanvientheotensdtgioitinh);
router.get("/nhanvien/timkiem3", getnhanvienchinhxac);
router.get("/nhanvien/:id", getnhanvientheoma); 
router.post("/nhanvien/", themnhanvienmoi);
router.put("/nhanvien/:id", suanhanvienn);
router.delete("/nhanvien/:id", xoanhanvienn);
// -------------------------sach-------------------------------
router.get("/sach/", getbook);
router.get("/sach/timkiem1", getsachtheotensach);
router.get("/sach/timkiem2", getsachtheotentacgia);
router.get("/sach/timkiem3", getsachtheonxb);
router.get("/sach/timkiem4", getsachtheonamxb);
//---------------------------sinhvien----------------------------
router.get("/sinhvien/", getsinhvien);
router.get("/sinhvien/timkiem1", getsinhvientheotensinhvien);
router.get("/sinhvien/timkiem2", getsinhvientheodiachi);
router.get("/sinhvien/timkiem3", getsinhvientren20);
export default router;