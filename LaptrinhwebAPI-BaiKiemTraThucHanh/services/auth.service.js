import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository.js";

const SECRET_KEY = "JWT_SECRET_KEY";

// ================= REGISTER =================
export async function register(dto) {
  // Prevent duplicate registration
  const existing = await userRepository.getByEmail(dto.email);
  if (existing) throw new Error("Email already registered");

  const hashedPassword = bcrypt.hashSync(dto.password, 8);

  // Resolve role_id: accept role_id directly or map role name to id
  let role_id = dto.role_id || null;
  if (!role_id && dto.role) {
    const roleName = String(dto.role).toLowerCase();
    const dbRoleId = await userRepository.getRoleIdByName(roleName);
    role_id = dbRoleId || role_id;
  }

  return await userRepository.createUser({
    full_name: dto.full_name || dto.name,
    email: dto.email,
    password_hash: hashedPassword,
    role_id: role_id || 2, // default member
  });
}

// ================= LOGIN =================
export async function login(email, password) {
  const user = await userRepository.getByEmail(email);
  if (!user) return null;

  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) return null;

  return jwt.sign(
    {
      id: user.id,
      role: user.role_name, // lấy từ JOIN roles
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}
