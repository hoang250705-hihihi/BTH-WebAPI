import { register, login } from "../services/auth.service.js";
import { logger } from "../config/logger.js";
import { registerSchema } from "../validators/authens/auth.validator.js";

export async function registerUser(req, res) {
  try {
    const validData = registerSchema.parse(req.body);
    const user = await register(validData);
    res.status(201).json({ message: "Register successful", user });
  } catch (err) {
    logger.error("Controller Error: register failed", err);
    res.status(400).json({ message: err.message });
  }
}

export async function loginUser(req, res) {
  const token = await login(req.body.email, req.body.password);
  if (!token) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json({ token });
}
