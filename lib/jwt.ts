import jwt, { SignOptions } from "jsonwebtoken";

export type UserRole = "admin" | "user";

export const generateToken = (userId: string, role: UserRole): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const options: SignOptions = {
    expiresIn:
      (process.env.JWT_EXPIRE_DATE as SignOptions["expiresIn"]) || "7d",
  };

  return jwt.sign(
    {
      userId,
      role,
    },
    secret,
    options,
  );
};
