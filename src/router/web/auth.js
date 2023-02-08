import { Router } from 'express'
import Session from '../../contenedores/ContenedorSession.js';
import bcrypt from '../../bcrypt/bcrypt.js';
import path from 'path'
import passport from 'passport'
import { Strategy } from "passport-local";
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

authWebRouter.get('/', (req, res) => {
    res.redirect('/main.html')
})

authWebRouter.get('/login', (req, res) => {
    if(req.session.passport?.user){
        res.redirect('/main.html')
    }else{
    res.redirect('/login.html')
    }
})

authWebRouter.post(
    '/login',
    passport.authenticate('login', {
      successRedirect: '/main',
      failureRedirect: '/login-error',
      passReqToCallback: true,
    }),
    (req, res) => {
      res.cookie('userEmail', req.session.passport.user)
    }
  )

authWebRouter.get('/register', (req, res)=>{
    res.redirect('/register.html')
})

authWebRouter.post('/register', async(req, res)=>{
  const registerData = { email: req.body.registerEmail, password: req.body.registerPassword }
  const response = await sessionService.registrarUsuario(registerData)
  if (response) {
    console.log("Registrado correctamente");
    res.redirect('/login.html')
  } else {
    res.redirect('/register-error.html')
  }
})

authWebRouter.get('/logout', (req, res) => {
    const nombre = req.session.passport?.user
    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.redirect('/logout.html')
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})

authWebRouter.get('/register-error', (req, res) =>{
    res.redirect('/register-error.html')
})

authWebRouter.get('/login-error', (req, res) =>{
    res.redirect('/login-error.html')
})

export default authWebRouter