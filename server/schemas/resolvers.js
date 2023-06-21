const { AuthenticationError } = require('apollo-server-express')
const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    user: async (parent, { username, userId }) => {
      return User.findOne({ $or: [{ _id: userId }, { username: username }] });
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user }
    },
    login: async (parent, { username, email, password }) => {
      const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
        
      if (!user) {
        throw new AuthenticationError('Cannot locate this user');
      }

      const correctPw = await user.isCorrectPassword(password);
      
      if (!correctPw) {
        throw new AuthenticationError('Wrong password!');
      }

      const token = signToken(user);

      return { token, user }
    },
    saveBook: async (parent, args, context) => {
       if (context.user) {
        const book = await User.create(args);

        await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: args } },
            { new: true, runValidators: true }
        );
        return book;
       }
       throw new AuthenticationError('Please log in to perform this action')
    },
    deleteBook: async (parent, args, context) => {
        if (context.user) {
            const book = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks:  args } },
                { new: true }
            );
            return book;
        }
        throw new AuthenticationError('Please log in to perform this action')
    }
  },
};

module.exports = resolvers;
