const bcrypt = require('bcrypt');

module.exports = {
    hashPass: async (password) => {
        return bcrypt.hash(password, 10);
      },
}