const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = process.env;

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const transporter = req.app.get("transporter");
    const { email, username, password } = req.body;
    const [result] = await db.auth_db.check_user_by_email(email);
    if (result) {
      return res.status(409).send("User already exists! Try again.");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const [user] = await db.auth_db.add_user(email, username, hash);
    req.session.user = {
      userId: user.user_id,
      email: user.email,
      username: user.username,
    };
    await transporter.sendMail(
        {
          from: `Josh Hyink ${EMAIL}`,
          to: req.session.user.email,
          subject: 'Thank you!',
          text: "Hello! Thank you for signing up for our oily services!",
        },
        (err) => {
          if (err) {
            res.sendStatus(500);
        } else {
              return res.status(200).send(req.session.user);
          }
        }
      );
    // } catch (err) {
    //   res.status(500).send(err);
    // }
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    const [foundUser] = await db.auth_db.check_user_by_email(email);
    if (!foundUser) {
      res.status(401).send("Incorrect email or password!");
    }
    const isAuthenticated = bcrypt.compareSync(password, foundUser.password);
    if (!isAuthenticated) {
      return res.status(401).send("Incorrect email or password!");
    }
    req.session.user = {
      userId: foundUser.user_id,
      email: foundUser.email,
    };
    console.log(req.session.user);
    return res.status(200).send(req.session.user);
  },
  logout: async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  getUser: (req, res) => {
    if (!req.session.user) {
      return res.status(401).send("User not found!");
    }
    return res.status(200).send(req.session.user);
  },
  email: async (req, res) => {
    try {
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

      let info = await transporter.sendMail(
        {
          from: `Josh Hyink ${EMAIL}`,
          to: req.session.user.email,
          subject: 'Thank you!',
          text: "Hello! Thank you for signing up for our oily services!",
        },
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send(info);
          }
        }
      );
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

// module.exports = {
//   register: async (req, res) => {
//     const db = req.app.set("db");
//     // const transporter = req.app.set("transporter");
//     const { email, username, password } = req.body;
//     const [result] = await db.auth_db.check_user_by_email(email);
//     if (result) {
//       return res.status(409).send("User already exists! Try again.");
//     }
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt);
//     const [user] = await db.auth_db.add_user(email, username, hash);
//     req.session.user = {
//       userId: user.user_id,
//       email: user.email,
//       username: user.username,
//     };

//     async function nodeMail(){
//       console.log(req.session.user.email)
//       try {
//         let transporter = nodemailer.createTransport({
//           host: "smtp.gmail.com",
//           port: 587,
//           service: "gmail",
//           requireTLS: true,
//           auth: {
//             user: EMAIL,
//             pass: PASSWORD,
//           },
//         });
    
//         let info = await transporter.sendMail(
//           {
//             from: `Josh Hyink ${EMAIL}`,
//             to: req.session.user.email,
//             subject: 'Thank you!',
//             text: "Hello! Thank you for signing up for our oily services!",
//           },
//           (err, res) => {
//             if (err) {
//               console.log(err);
//               res.sendStatus(500);
//             } else {
//               // res.status(200).send(info);
//               return res.status(200).send(req.session.user);
//             }
//           }
//         );
//         nodeMail();
//       } catch (err) {
//         res.status(500).send(err);
//       }
//     }
    
//   },
//   login: async (req, res) => {
//     const db = req.app.get("db");
//     const { email, password } = req.body;
//     const [foundUser] = await db.auth_db.check_user_by_email(email);
//     if (!foundUser) {
//       res.status(401).send("Incorrect email or password!");
//     }
//     const isAuthenticated = bcrypt.compareSync(password, foundUser.password);
//     if (!isAuthenticated) {
//       return res.status(401).send("Incorrect email or password!");
//     }
//     req.session.user = {
//       userId: foundUser.user_id,
//       email: foundUser.email,
//     };
//     console.log(req.session.user);
//     return res.status(200).send(req.session.user);
//   },
//   logout: async (req, res) => {
//     req.session.destroy();
//     res.sendStatus(200);
//   },
//   getUser: (req, res) => {
//     if (!req.session.user) {
//       return res.status(401).send("User not found!");
//     }
//     return res.status(200).send(req.session.user);
//   }
// };
