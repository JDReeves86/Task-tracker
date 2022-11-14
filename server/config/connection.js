require("dotenv");
const { connect, connection } = require("mongoose");

// creates mongodb connection
connect(`mongodb://localhost:27017/organizerDB`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((err) => console.log(err));

module.exports = connection;
