import passport from "passport";
import { Strategy } from "passport-local";
const LocalStrategy = Strategy;

import UsuariosDaoMongodb from "../../models/daos/usuarios/UsuariosDaoMongodb.js";
const sessionService = new UsuariosDaoMongodb()

import objectUtils from '../../utils/objetUtils/objectUtils.js';

//Passport
passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'emailUser',
        passwordField: 'passwordUser',
        passReqToCallback: true,
      },
      async (req, emailUser, passwordUser, done) => {
        const usuario = await sessionService.buscarUsuarioPorEmail(emailUser)
        if (!usuario) return done(null, false)
        if (!objectUtils.isValidPassword(usuario, passwordUser)) return done(null, false)
        return done(null, usuario)
      }
    )
  )
  // Serialize
  passport.serializeUser((user, done) => {
    done(null, user.email)
  })
  // Deserialize
  passport.deserializeUser(async (email, done) => {
    const user = await sessionService.buscarUsuarioPorEmail(email)
    done(null, user)
  })
