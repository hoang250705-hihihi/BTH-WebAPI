import { pool } from "../services/mysql.js";

//Lay tat sach
export const bookRepo = {
    getBook: async () => {
        const db = pool; 
        const ketqua = db.query("SELECT * FROM SACH"); 
        return ketqua;
    }
};
//Lay sach theo ten sach
export const laysachtheotensach = {
    getSachtheotensach: async (tensach) => {
        try {
            const db = pool;
            const query = "SELECT * FROM SACH WHERE TENSACH LIKE ?";
            const [rows] = await db.query(query, ['%${tensach}%']);
            return rows;
        }
        catch (error) {
            console.error("Loi co so du lieu:", error); throw error;
        }
    }
}
//Lay sach theo ten tac gia
export const laysachtheotentacgia = {
    getSachtheotentacgia: async (tentacgia) => {
        try {
            const db = pool;
            const query = "SELECT * FROM SACH WHERE TACGIA LIKE ?";
            const [rows] = await db.query(query, ['%${tentacgia}%']);
            return rows;
        }
        catch (error) {
            console.error("Loi co so du lieu:", error); throw error;
        }
    }
}
//Lay ach theo nxb
export const laysachtheonxb = {
    getSachtheonxb: async (nxb) => {
        try {
            const db = pool;
            const query = "SELECT * FROM SACH WHERE NHAXB LIKE ?";
            const [rows] = await db.query(query, ['%${nxb}%']);
            return rows;
        }
        catch (error) {
            console.error("Loi co so du lieu:", error); throw error;
        }
    }
}
//Lay sach theo nam xb(15 nam gan day)
export const laysachtheonamxb = {
    getSachtheonamxb: async () => {
        try {
            const db = pool;
            const namht = new Date().getFullYear();
            const namxb = namht - 15;
            const query = "SELECT * FROM SACH WHERE NAMXB >= ?";
            const [rows] = await db.query(query, [namxb]);
            return rows;
        }
        catch (error) {
            console.error("Loi co so du lieu:", error); throw error;
        }
    }
}
