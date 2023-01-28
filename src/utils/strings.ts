import { createHmac } from "node:crypto";

export function hashPassword(password: string): string {
  return createHmac("sha256", "silabuz-secret").update(password).digest("hex");
}

export function comparePassword(
  password: string,
  checkPassword: string
): boolean {
  return password === hashPassword(checkPassword);
}
