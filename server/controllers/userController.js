const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        const db = req.app.set('db')
        const {email, username, password} = req.body
        const [result] = await db.auth_db.check_user_by_email(email)
        if(result){
            return res.status(409).send('User already exists! Try again.')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [user] = await db.auth_db.add_user(email, username, hash)
        req.session.user = {
            userId: user.user_id,
            email: user.email,
            username: user.username
        }
        return res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const {email, password} = req.body
        const [foundUser] = await db.auth_db.check_user_by_email(email)
        if(!foundUser){
            res.status(401).send('Incorrect email or password!')
        }
        const isAuthenticated = bcrypt.compareSync(password, foundUser.password)
        if(!isAuthenticated){
            return res.status(401).send('Incorrect email or password!')
        }
        req.session.user = {
            userId: foundUser.user_id,
            email: foundUser.email
        }
        console.log(req.session.user)
        return res.status(200).send(req.session.user)
    },
    logout: async (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: (req, res) => {
        if(!req.session.user){
            return res.status(401).send('User not found!')
        }
        return res.status(200).send(req.session.user)
    }
}