import { Router } from 'express'
import Session from '../../contenedores/ContenedorSession.js';
import bcrypt from '../../bcrypt/bcrypt.js';
import passport from 'passport'
import { Strategy } from "passport-local";

//Import main
import { getHomeController } from '../../controllers/main.js'

//Import register
import { getRegisterController , postRegisterController } from '../../controllers/register.js';
import { upload } from '../../multer/multer.js';

//Import logins
import { getLoginController, postLoginController } from '../../controllers/login.js'

//Import Logouts
import { getLogoutController } from '../../controllers/logout.js'

const LocalStrategy = Strategy;
const authWebRouter = new Router()
const sessionService = new Session()

passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'emailUser',
        passwordField: 'passwordUser',
        passReqToCallback: true,
      },
      async (req, emailUser, passwordUser, done) => {
        const usuario = await sessionService.buscarUsuarioEmail(emailUser)
        if (!usuario) return done(null, false)
        if (!bcrypt.isValidPassword(usuario, passwordUser)) return done(null, false)
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
    const user = await sessionService.buscarUsuarioEmail(email)
    done(null, user)
  })

//Rutas

authWebRouter.get('/', getHomeController)

//Rutas de login
authWebRouter.get('/login', getLoginController)

authWebRouter.post(
    '/login',
    passport.authenticate('login', {
      successRedirect: '/main.html',
      failureRedirect: '/login-error.html',
      passReqToCallback: true,
    }),
    (req, res) => {
      res.cookie('userEmail', req.session.passport.user)
    }
  )

//Rutas de registro  
authWebRouter.get('/register', getRegisterController)

authWebRouter.post('/register', upload.single('photo') , postRegisterController)

//Rutas de logout
authWebRouter.get('/logout', getLogoutController)

authWebRouter.get('/register-error', (req, res) =>{
    res.redirect('/register-error.html')
})

authWebRouter.get('/login-error', (req, res) =>{
    res.redirect('/login-error.html')
})

export default authWebRouter