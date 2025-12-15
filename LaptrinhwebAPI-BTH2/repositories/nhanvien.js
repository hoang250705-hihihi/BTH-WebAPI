import { pool } from "../services/mysql.js";

//Lay tat nhan vien
export const nhanvienRepo = {
    getNhanvien: async () => {
        const db = pool; 
        const ketqua = db.query("SELECT * FROM NHANVIEN"); 
        return ketqua;
    }
};

//Lay nhan vien theo ma
export const laynhanvienid = {
    getNhanvienById: async (id) => {
    try {
            const db = await pool;
            const [rows] = await db.query("SELECT * FROM NHANVIEN WHERE MaNV = ?", [id]);
            
            if (rows.length === 0) {
                throw new Error("Nhân viên không tồn tại");
            }
            return rows[0];
        } catch (error) {
            console.error("Loi co so du lieu:", error);
            throw error;
        }
    }
}
// Lay tnhan vien theo ten, sdt
export const laynhanvientheotensdt = {
    getNhanvientheotensdt: async (ten, sdt) => {
        try {
            const db = pool;
            let query = "SELECT * FROM NHANVIEN WHERE 1=1";
            const dstam = [];
            if (ten) {
                query += " AND TenNV LIKE ?";
                dstam.push('%${ten}%');
            }
            if (sdt) {
                query += " AND SDT LIKE ?";
                dstam.push('%${sdt}%');
            }
            const [rows] = await db.query(query, dstam);
            return rows;
        } catch (error) {
            console.error("Loi co so du lieu:", error); throw error;
        }
    }
}
//Laynhan vien theo ten, so dt, gioi tinh
export const laynhanvientheotensdtgioitinh = {
    getNhanvientheotensdtgioitinh: async (ten, sdt, gioitinh) => {
        try {
            const db = pool;
            let query = "SELECT * FROM NHANVIEN WHERE 1=1";
            const dstam = [];
            if (ten) {
                query += " AND TenNV LIKE ?";
                dstam.push('%${ten}%');
            }
            if (sdt) {
                query += " AND SDT LIKE ?";
                dstam.push('%${sdt}%');
            }
            if (gioitinh) {
                query += " AND GioiTinh = ?";
                dstam.push(gioitinh);
            }
            const [rows] = await db.query(query, dstam);
            return rows;
        }
        catch (error) {
            console.error("Loi co so du lieu:", error); throw error;
        }
    }
}
//Lay nhan vienchinh sac gom: ten, email
export const laynhanvienchinhxac = {
    getNhanvienchinhxac: async (ten, email) => {
        try {
            const db = pool;
            let query = "SELECT * FROM NHANVIEN WHERE 1=1";
            const dstam = [];
            if (ten) {
                query += " AND TenNV = ?";
                dstam.push(ten);
            }
            if (email) {
                query += " AND email = ?";
                dstam.push(email);
            }
            const [rows] = await db.query(query, dstam);
            return rows;
        }
        catch (error) {
            console.error("Loi co so du lieu:", error); throw error;
        }
    }
}
//them nhan vien
export const themnhanvien = {
    getThemnhanvien: async (nhanvien) => {
        try {
            const db = pool;
            const query = "INSERT INTO NHANVIEN (maNV, TenNV, GioiTinh,NgaySinh, email, SDT) VALUES (?, ?, ?, ?, ?, ?)";
            const values = [nhanvien.maNV, nhanvien.TenNV, nhanvien.GioiTinh, nhanvien.NgaySinh, nhanvien.email, nhanvien.SDT];    
            const [result] = await db.query(query, values);
            return result;
        }
        catch (error) {
            console.error("Loi co so du lieu:", error); throw error;
        }
    }
}

//sua nhan vien
export const suanhanvien = {
    getSuanhanvien: async (id, nhanvien) => {
        try {
            const db = pool;
            const query = "UPDATE NHANVIEN SET TenNV = ?, GioiTinh = ?,NgaySinh = ?, email = ?, SDT = ? WHERE maNV = ?";
            const values = [nhanvien.TenNV, nhanvien.GioiTinh, nhanvien.NgaySinh, nhanvien.email, nhanvien.SDT, id];    
            const [result] = await db.query(query, values);
            return result;
        }
        catch (error) {
            console.error("Loi co so du lieu:", error); throw error;
        }
    }
}
//xoa nhan vien
export const xoanhanvien = {
    getXoanhanvien: async (id) => {
        try {
            const db = pool;
            const query = "DELETE FROM NHANVIEN WHERE maNV = ?";
            const [result] = await db.query(query, [id]);
            return result;
        }
        catch (error) {
            console.error("Loi co so du lieu:", error); throw error;
        }
    }
}
