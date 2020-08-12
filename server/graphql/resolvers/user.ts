import { PubSub } from "apollo-server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import config from "../../../config";
import User from "../../models/user";
import { transformUser, getUser } from "./merge";
const pubsub = new PubSub();

const USER_ADDED = "USER_ADDED";
const USER_CONNECTED = "USER_CONNECTED";

/**
 * User Queries
 */

const UserQueries = {
  users: async (/*parent, args, context*/) => {
    try {
      const users = await User.find();

      return users.map((user) => {
        return transformUser(user);
      });
    } catch (err) {
      return console.error(err);
    }
  },
  user: async (parent, { userId }) => {
    try {
      return getUser(userId);
    } catch (err) {
      return console.error(err);
    }
  },
  login: async (parent, { email, password }) => {
    try {
      const user: any = await User.findOne({ email, password });

      if (!user) {
        console.error(new Error("User does not Exists"));
      }

      const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
        expiresIn: "1h",
      });

      return {
        userId: user.id,
        token,
        tokenExpiration: 1,
      };
    } catch (err) {
      return console.error(err);
    }
  },
};

/**
 * User Mutations
 */

const UserMutation = {
  createUser: async (parent: any, { userInput }: any) => {
    try {
      const user = await User.findOne({
        email: userInput.email,
      });

      if (user) {
        throw new Error("User already Exists");
      } else {
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          firstname: userInput.firstname,
          lastname: userInput.lastname,
          email: userInput.email,
          password: userInput.password,
          passwordConfirm: userInput.passwordConfirm,
          role: userInput.role,
        });
        const savedUser = await newUser.save();
        pubsub.publish(USER_ADDED, {
          userAdded: transformUser(savedUser),
        });
        const token = jwt.sign({ userId: savedUser.id }, config.jwtSecret, {
          expiresIn: "1h",
        });

        return {
          userId: savedUser.id,
          token,
          tokenExpiration: 1,
        };
      }
    } catch (err) {
      throw new Error(err);
    }
  },
  updateUser: async (
    parent: any,
    { userId, updateUser }: any,
    context: any
  ) => {
    // If not authenticated throw error
    if (!context.isAuth) {
      console.error(new Error("Non Authenticated"));
    }

    try {
      const user = await User.findByIdAndUpdate(userId, updateUser, {
        new: true,
      });

      return transformUser(user);
    } catch (err) {
      throw new Error(err);
    }
  },
  setUser: async (parent, { userInput }: any) => {
    try {
      const user = await User.findOne({
        email: userInput.email,
      });

      if (user) {
        const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
          expiresIn: "1h",
        });
        pubsub.publish(USER_CONNECTED, {
          userConnected: transformUser(user),
        });

        return {
          userId: user.id,
          token,
          tokenExpiration: 1,
        };
      }

      throw new Error("Unknown user");
    } catch (err) {
      throw new Error(err);
    }
  },
};

/**
 * User Subscriptions
 */

const UserSubscription = {
  userAdded: {
    subscribe: () => pubsub.asyncIterator([USER_ADDED]),
  },
  userConnected: {
    subscribe: () => pubsub.asyncIterator([USER_CONNECTED]),
  },
};

export { UserQueries, UserMutation, UserSubscription };
