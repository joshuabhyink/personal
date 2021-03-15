require("dotenv").config();
const massive = require("massive");
const express = require("express");
const session = require("express-session");
const authCTRL = require('./controllers/userController')
const tripCTRL = require('./controllers/tripController')
const shopCTRL = require('./controllers/shoppingController')
const nodemailer = require('nodemailer')

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;
const { EMAIL, PASSWORD } = process.env;
const app = express();

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    service: "gmail",
    requireTLS: true,
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

app.use(express.json());
app.set('transporter', transporter)
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
app.get('/auth/user', authCTRL.getUser)
// app.post('api/sendemail', authCTRL.email)

// Trip Endpoints
app.post('/api/trip', tripCTRL.createTrip)
app.get('/api/trips', tripCTRL.readTrips)
app.get('/api/trip/:id', tripCTRL.readTrip)
app.put('/api/trip/:id', tripCTRL.updateTrip)
app.delete('/api/trip/:id', tripCTRL.deleteTrip)

// Oil Endpoints
app.get('/api/oil', tripCTRL.getOilMiles)
app.post('/api/add-oil', tripCTRL.addOilMiles)
app.put('/api/update-oil', tripCTRL.updateOilMiles)

// Shopping Endpoints
app.get('/api/items', shopCTRL.loadShoppingItems)
app.get('/api/cart', shopCTRL.getCart)
app.post('/api/add-to-cart', shopCTRL.addToCart)
app.delete('/api/remove', shopCTRL.removeFromCart)
