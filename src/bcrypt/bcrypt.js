import session from 'express-session';
import MongoStore from 'connect-mongo';
import bCrypt from 'bcrypt';

function createOnMongoStore() {
    const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
    return session({
      store: MongoStore.create({
        mongoUrl: 'mongodb+srv://micaela:micaela@cluster0.m1b6gix.mongodb.net/micadb',
        mongoOptions: advancedOptions,
        ttl: 120,
        collectionName: 'sessions',
      }),
      secret: 'micaela',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 },
    })
}
  
function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}
  
function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password)
}
  
export default {createOnMongoStore, createHash, isValidPassword}