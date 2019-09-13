const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = server => {
  server
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));
};
