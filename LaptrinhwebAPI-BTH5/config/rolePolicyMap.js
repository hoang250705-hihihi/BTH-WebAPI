import { POLICIES } from "../utils/constants/policies.js";

export const rolePolicyMap = {
  // Quyền cho Admin: Xem tất cả, Thêm, Sửa, Xóa
  Admin: [
    //Quyền admin cho bang SanPham
    POLICIES.SanPham_VIEW_ALL,
    POLICIES.SanPham_VIEW_ONE,
    POLICIES.SanPham_CREATE,
    POLICIES.SanPham_UPDATE,
    POLICIES.SanPham_DELETE,
    //Quyền admin cho bang DanhMuc
    POLICIES.DanhMuc_VIEW_ALL,
    POLICIES.DanhMuc_VIEW_ONE,
    POLICIES.DanhMuc_CREATE,
    POLICIES.DanhMuc_UPDATE,
    POLICIES.DanhMuc_DELETE
  ],
  
  // Quyền cho User: Xem tất cả và Thêm; Không có Update/Delete
  User: [
    //Quyền user cho bang SanPham
    POLICIES.SanPham_VIEW_ALL,
    POLICIES.SanPham_VIEW_ONE,
    POLICIES.SanPham_CREATE,
    //Quyền user cho bang DanhMuc
    POLICIES.DanhMuc_VIEW_ALL,
    POLICIES.DanhMuc_VIEW_ONE,
    POLICIES.DanhMuc_CREATE
  ]
};