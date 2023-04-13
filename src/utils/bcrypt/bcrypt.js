import bcrypt from 'bcrypt';

export async function createHash(password) {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
}

export async function isValidPassword(user, password) {
  const match = await bcrypt.compare(password, user.password);
  return match;
}

export default {createHash, isValidPassword}