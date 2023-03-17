import bCrypt from 'bCrypt';

export const createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

export const isValidPassword = (password, passwordHash) => {
  return bCrypt.compareSync(password, passwordHash)
}

export default {createHash, isValidPassword}