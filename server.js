const server = require("express")();
const https = require("https");
const fs = require("fs");
const port = process.env.PORT || 9000;
const os = require("os");
const mongoose = require("mongoose");

const sslCert = fs.readFileSync("./cert.pem");

var mongooseOptions = {
  sslCA: sslCert,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const httpsOptions = {
  key: fs.readFileSync("./key.pem"),
  cert: sslCert,
  passphrase: "secret"
};

// Middlewares
require("./middlewares")(server);

//Routes
server.use("/api", require("./routes/Location.routes"));

mongoose.connect("mongodb://localhost:27017/pudle", mongooseOptions, error => {
  if (error) {
    console.log("Unable to connect with mongodb", error);
    return;
  }
  console.log("Connected to Mongodb");
});

server.get("/", (req, res) => {
  res.send("Hello world");
});

server.get("/system-health", (req, res) => {
  res.json({
    cpu: os.cpus(),
    memory: os.totalmem()
  });
});

https.createServer(httpsOptions, server).listen(port, () => {
  console.log("Magic happens at ", port);
});
