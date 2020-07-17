var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");

var app = express();

app.use(bodyParser.json());
// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

var messages = [
  { text: "some text 123", owner: "Owner 1" },
  { text: "some text", owner: "Owner 2" },
];

var users = [
  {
    firstName: "Tom",
    lastName: "Dummy",
    email: "tom@email.com",
    password: "1234",
    id: 0,
  },
];

var api = express.Router();
var auth = express.Router();

api.get("/messages", (req, res, next) => {
  res.json(messages);
});

api.get("/messages/:user", (req, res, next) => {
  var user = req.params.user;
  var results = messages.filter((message) => message.owner == user);
  res.json(results);
});

api.post("/messages", (req, res, next) => {
  console.log(req.body);
  messages.push(req.body);
  res.json(messages).status(200);
  //res.json(messages);
});

api.get("/users/me", checkAuthenticated, (req, res) => {
  // console.log(req.user);
  res.json(users[req.user]);
});

api.post("/users/me", checkAuthenticated, (req, res) => {
  var user = users[req.user];

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;

  res.json(user);
});

auth.post("/login", (req, res) => {
  var user = users.find((user) => user.email == req.body.email);

  if (!user)
    return res.json({ success: false, message: "email or password incorrect" });

  if (user.password == req.body.password) sendToken(user, res);
  else
    return res.json({ success: false, message: "email or password incorrect" });
});

auth.post("/register", (req, res, next) => {
  var index = users.push(req.body) - 1;

  var user = users[index];
  user.id = index;

  sendToken(user, res);
});

function sendToken(user, res) {
  var token = jwt.sign(user.id, "123");
  res.json({ firstName: user.firstName, token: token });
}

function checkAuthenticated(req, res, next) {
  if (!req.header("authorization"))
    return res
      .status(401)
      .send({ message: "Unauthorized request. Missing authentication header" });

  var token = req.header("authorization").split(" ")[1];

  var payload = jwt.decode(token, "123");

  if (!payload)
    return res.status(401).send({
      message: "Unauthorized request. Authentication header is invalid",
    });

  req.user = payload;

  next();
}

app.use("/api", api);
app.use("/auth", auth);

app.listen(1234);
