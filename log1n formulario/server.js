import cookieParser from 'cookie-parser';
import session from 'express-session';
import express from 'express'
const app = express();
import MongoStore from 'connect-mongo';

import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))
import {mongoConnection} from  './db.js'
import { auth } from './services.js';
import { setTimeout } from 'timers/promises';

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')))


app.use(cookieParser());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongoConnection, mongoOptions
    }),

    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 50000,
    },
  })
);


app.set('port', 8080)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')



app.listen(8080, () => {
    
    console.log(`El servidor está escuchando el puerto: 8080`)

})





app.get('/', (req, res) => {
    if(req.session.user){
      res.render('index', {data : req.session.user})
    }else{
      res.render('index', {data:undefined})
    }
})

app.post('/login', (req, res) => {
  
    
    req.session.user = req.body.user
    res.redirect('/')


  
})

app.get('/logOut', (req, res) => {
  let user = req.session.user
  req.session.destroy()
  res.render('bye', {data: user})
 
    
})


app.get('/register', (req, res) => {
  res.render('register')
})