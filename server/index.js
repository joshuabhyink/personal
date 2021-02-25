require("dotenv").config();
const massive = require("massive");
const express = require("express");
const session = require("express-session");
const authCTRL = require('./controllers/userController')

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;
const app = express();

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60}
}))

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
    app.set('db', db)
    console.log('db connected')
    app.listen(SERVER_PORT, () => {
        console.log(`Server listening on port ${SERVER_PORT}`)
    })
})

// Auth Endpoints
app.post('/auth/register', authCTRL.register)
app.post('/auth/login', authCTRL.login)
app.post('/auth/logout', authCTRL.logout)
app.get('auth/user', authCTRL.getUser)