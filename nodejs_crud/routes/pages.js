const express = require('express')
const { auth , requiresAuth} = require('express-openid-connect');
const handlebars = require('express-handlebars');
const router = express()

router.set('view engine' , 'hbs')

// auth router attaches /login, /logout, and /callback routes to the baseURL

const config = {
    authRequired: true,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'vb4QdHWQKeGIy9W4GZM0mGfiprEjXn5R',
    issuerBaseURL: 'https://dev-66t15o3w.us.auth0.com'
  };




router.use(auth(config));

router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? res.redirect('/auth/login') : 'Logged out');
  });

router.get('/profile' , (req, res) => {
    
    var info = req.oidc.user
    res.render('profile' , {
        message : info
    })

  });

router.get('/home' , (req , res) => {
    res.render('dashboard')
    })
  
router.get('/dashboard' , (req , res) => {
    res.redirect('/auth/dashboard')
      res.render('dashboard')
    })

router.get('/service' , (req , res) => {
    res.render('register')
    })

module.exports = router