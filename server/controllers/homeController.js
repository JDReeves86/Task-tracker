const { User, Task, Note } = require('../../models/index')

module.exports = {
    userLogin: async (req, res) => {
        try {
            const userData = await User.findOne({
              username: req.body.username,
            });
      
            // rejects if no user data found
            if (!userData) {
              res.status(400).json({ message: "No users by that name found" });
              return;
            }
      
            // compares email addresses
            if (req.body.email !== userData.email) {
              res.status(400).json({ message: "invalid email address" });
              return;
            }
      
            // calls static to compare input password with hashed password
            const validPassword = await userData.schema.statics.comparePassword(
              req.body.password,
              userData.password
            );
      
            // rejects if static method fails.
            if (!validPassword) {
              res.status(400).json({ message: "invalid password" });
              return;
            }
      
            res.status(200).json(userData);
          } catch (err) {
            console.log(err);
            if (err) res.status(400).json(err);
          }
    }
}