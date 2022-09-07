const port = 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./Models/User.model");
const Reservation = require("./Models/Reservations.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const isAuth = require("./middlewares/isAuth");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/login", (req, res, next) => {
  const { cin, password } = req.body;
  console.log(cin,"cin bb")
  User.findOne({
    cin
  }).then((user) => {
    if (!user) {
      return res.json({status:false, msg: "Invalid Cin!" });
    }
    bcrypt
      .compare(password, user.password)
      .then((doMatch) => {
        if (!doMatch) {
          return res.json({status:false, msg:"wrong password"})
        }
        const accessToken = jwt.sign(
          {
            userId: user._id,
            userRole: user.role,
          },
          "mystrongsecretkey",
          { expiresIn: "1y" }
        );

        res.status(200).json({status:true, token: accessToken });
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  });
});

app.post("/api/register", (req, res, next) => {
  const { name, password, phoneNumber, cin } = req.body;

  User.findOne({ cin })
    .then((user) => {
      if (user) {
        const error = new Error("User Already Exists.");
        error.statusCode = 422;
        throw error;
      }
      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          return (user = new User({
            fullname: name,
            cin,
            password: hashedPassword,
            phoneNumber,
          }));
        })
        .then((result) => {
          user.save();
          return res.status(201).json({ message: "user created!" });
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/api/user-role", isAuth, (req, res) => {
  const role = req.userRole;
  return res.status(200).json({ role });
});

app.post("/api/add-reservation", isAuth, (req, res, next) => {
  const { matricule, noHours, place, time, date } = req.body;
  Reservation.find({ matricule })
    .then((r) => {
      const reservation = new Reservation({
        matricule,
        noHours,
        place,
        name: req.userId,
        date,
        time
      });
      reservation.save();
      return res.json({ reservation });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

app.get("/api/reservations", isAuth, (req, res) => {
  const role = req.headers.role;
  console.log(role)

  if (role === "Admin") {
     Reservation.find()
      .populate("name", "fullname")
      .then((result) => {
        return res.json(result);
      })
      .catch((error) => {
        console.log(error);
      });
  } 
  else {
    console.log("rani user")
    Reservation.find({ name: req.userId })
      .populate("name", "fullname")
      .then((result) => {
        return res.json(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

app.delete("/:id", isAuth, (req, res, next) => {
    const { id } = req.params;
    console.log("id",id)
  Reservation.findById(id)
    .then((reservation) => {
      if (!reservation) {
        const error = new Error("Could Not Find This Reservation.");
        error.statusCode = 404;
        throw error;
      }
      Reservation.findByIdAndRemove(id).then((result) => {
        return res.json(result);
      });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

app.use((error, req, res, next) => {
  const data = error.data;
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(`mongodb://localhost:27017/projectSousse`)
  .then(() => {
    app.listen(port);
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
