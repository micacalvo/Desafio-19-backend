import { Router } from 'express'
import Session from '../../contenedores/ContenedorSession.js';
import util from '../../funcionUtil/util.js';
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
        const usuario = await sessionService.buscarUsuarioPorEmail(emailUser)
        if (!usuario) return done(null, false)
        if (!util.isValidPassword(usuario, passwordUser)) return done(null, false)
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

//Rutas 

authWebRouter.get('/', (req, res) => {
    res.redirect('/home')
})

authWebRouter.get('/login', (req, res) => {
    if(req.session.passport?.user){
        res.redirect('/home')
    }else{
        res.sendFile('login.html', {root: 'public'})
    }
})

authWebRouter.get('/registro', (req, res)=>{
    res.sendFile('registro.html', {root: 'public'})
})

//Para capturar los datos del form y ver si el usuario existe
authWebRouter.post('/login',
    passport.authenticate('login', {
      successRedirect: '/home',
      failureRedirect: '/login-error',
      passReqToCallback: true,
}), (req, res) => {
      res.cookie('userEmail', req.session.passport.user)
    }
)

//Este post para dar de alta al usuario
authWebRouter.post('/registro', async(req, res)=>{
  const registerData = { email: req.body.registerEmail, password: req.body.registerPassword }
  const response = await sessionService.registrarUsuario(registerData)
  if (response) {
    console.log("Registrado correctamente");
    res.redirect('/login')
  } else {
    res.redirect('/registro-error')
  }
})

authWebRouter.get('/logout', (req, res) => {
    const nombre = req.session.passport?.user
    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), '/public/logout.html'), { nombre })
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})

authWebRouter.get('/registro-error', (req, res) =>{
    res.sendFile('registro-error.html', {root: 'public'})
})

authWebRouter.get('/login-error', (req, res) =>{
    res.sendFile('login-error.html', {root: 'public'})
})

export default authWebRouter