import { pool } from "../services/mysql.js";

//Lay sinh vien
export const sinhvienRepo = {
    getSinhvien: async () => {
        const db = pool; 
        const ketqua = db.query("SELECT * FROM SINHVIEN"); 
        return ketqua;
    }
};

//Lay sv theo ten sinh vien
export const laysinhvientheotensinhvien = {
    getSinhvientheoten: async (tensv) => {
        try {
            const db = pool;
            const query = "SELECT * FROM SINHVIEN WHERE TenSV LIKE ?";
            const [rows] = await db.query(query, ['%${tensv}%']);
            return rows;
        }
        catch (error) {
            console.error("Loi co so du lieu:", error); throw error;
        }
    }
}

//LAy sv theo dia chi
export const laysinhvientheodiachi = {
    getSinhvientheodiachi: async (diachi) => {
        try {
            const db = pool;
            const query = "SELECT * FROM SINHVIEN WHERE DiaChi LIKE ?";
            const [rows] = await db.query(query, ['%${diachi}%']);
            return rows;
        }
        catch (error) {
            console.error("Loi co so du lieu:", error); throw error;
        }
    }
}
//lay sv tren 20 tuoi
export const laysinhvientren20 = {
    getSinhvientren20: async () => {
        try {
            const db = pool;
            const query = 'SELECT * FROM SINHVIEN WHERE TIMESTAMPDIFF(YEAR, NgaySinh, CURDATE()) > 20';
            const [rows] = await db.query(query);
            return rows;
        } catch (error) {
            console.error("Loi co so du lieu:", error);
            throw error;
        }
    }
}
