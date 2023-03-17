import passport from 'passport'
import  { Strategy as LocalStrategy } from 'passport-local'
import { usuariosDao } from '../../daos/daos.js'
import { isValidPassword } from '../../bcrypt/bcrypt.js'

passport.use('login' , new LocalStrategy(async(username, password , done) => {

    const usuarios = await usuariosDao.getAll()
    if( usuarios === false ) done(Error('Error') )
    const user = usuarios.find(usuario => usuario.email === username)
    if( !user) {
        done(null, false)
    }else{
        if(isValidPassword(password , user.password)){
            done(null, user)
        } else {
            done(null, false)
        }
    }}) )

passport.serializeUser((user, done ) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    done(null, await usuariosDao.getById(id))
})

export const authenticate = passport.authenticate('login',{
    successRedirect: '/main',
    failureRedirect: '/login-error'
  })

