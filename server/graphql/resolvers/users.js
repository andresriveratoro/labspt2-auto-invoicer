const bcrypt = require('bcryptjs');

const User = require('../../models/user');
const isAuth = require('../../middleware/isAuth')

module.exports = {
  users: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('not logged in')
    // }
    
    try {
      const users = await User.find();
      return users.map(user => {
        return { ...user._doc, password: null }
      });
    } catch (err) {
      throw err;
    }
  },
  createUser: async (args) => {
    try {
      const userExists = await User.findOne({ email: args.userInput.email });
      if (userExists) {
        throw new Error('Username already exists');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
        name: args.userInput.name,
        phone_num: args.userInput.phone_num
      });
      const newUser = await user.save();
      return { ...newUser._doc, password: null };
    } catch (err) {
      throw err;
    }
  }
};