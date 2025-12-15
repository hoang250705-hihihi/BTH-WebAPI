import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { SanPhamController } from "../controllers/sanpham.controller.js";
import { DanhMucController } from "../controllers/danhmuc.controller.js";
import { NhanVienController } from "../controllers/nhanvien.controller.js";
import { PhongBanController } from "../controllers/phongban.controller.js";
import { CongTrinhController } from "../controllers/congtrinh.controller.js";
const router = Router();

// ----------------------- USERS -------------------------------------
router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

// ----------------------- HANGHOAS -------------------------------------
//router.get("/hanghoas", hanghoaController.getAll);
//router.get("/hanghoas/ma-loai/:MaLoai", hanghoaController.getByMaLoai);
///router.get("/hanghoas/ten-loai/:TenLoai", hanghoaController.getTenLoai);
//router.get("/hanghoas/sap-het", hanghoaController.getHangSapHet);


//bài 1
// ----------------------- SANPHAMS -------------------------------------
router.get("/sanphams", SanPhamController.getAll);
router.get("/sanphams/search/", SanPhamController.getByTen);
router.get("/sanphams/ma/:Ma", SanPhamController.getByMa);
router.post("/sanphams", SanPhamController.postSanPham);
router.put("/sanphams/:Ma", SanPhamController.putSanPham);
router.delete("/sanphams/:Ma", SanPhamController.deletesanpham);
router.get("/sanphams/phantrang", SanPhamController.phantrang); 
router.get("/sanphams/danhmuc", SanPhamController.thongkeDanhMuc);
// ----------------------- DANHMUCS -------------------------------------
router.get("/danhmucs", DanhMucController.getAll);
router.get("/danhmucs/madanhmuc/:MaDanhMuc", DanhMucController.getByMaDanhMuc);

//Bài 2
router.get("/nhanviens", NhanVienController.getAll);
router.get("/nhanviens/manv/:MaNV", NhanVienController.getByMaNV);
// router.get("/nhanviens/mapb/:MAPB", NhanVienController.getByMAPB);
router.post("/nhanviens", NhanVienController.postNhanVien);
router.put("/nhanviens/:MaNV", NhanVienController.putNhanVien);
router.delete("/nhanviens/:MaNV", NhanVienController.deleteNhanVien);
router.get("/phongbans", PhongBanController.getAll);
router.get("/congtrinhs", CongTrinhController.getAll);

export default router;
