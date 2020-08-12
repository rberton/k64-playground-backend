import { PubSub } from "apollo-server";
import mongoose from "mongoose";
import Role from "../../models/role";
import { transformRole } from "./merge";

const pubsub = new PubSub();

const ROLE_ADDED = "ROLE_ADDED";

/**
 * Role Queries
 */

const RoleQueries = {
  roles: async (/*parent, args, context*/) => {
    try {
      const roles = await Role.find();

      return roles.map((role) => {
        return transformRole(role);
      });
    } catch (err) {
      return console.error(err);
    }
  },
  role: async (parent, { roleId }) => {
    try {
      const role = await Role.findById(roleId);

      return transformRole(role);
    } catch (err) {
      return console.error(err);
    }
  },
};

/**
 * Role Mutations
 */

const RoleMutation = {
  createRole: async (parent: any, { roleInput }: any) => {
    try {
      const role = await Role.findOne({
        label: roleInput.label,
      });

      if (role) {
        console.error(new Error("Role already Exists"));
      } else {
        const newRole = new Role({
          _id: new mongoose.Types.ObjectId(),
          label: roleInput.label,
        });
        const savedRole = await newRole.save();
        pubsub.publish(ROLE_ADDED, {
          roleAdded: transformRole(savedRole),
        });

        return {
          roleId: savedRole.id,
        };
      }
    } catch (err) {
      return console.error(err);
    }
  },
  updateRole: async (parent, { roleId, updateRole }, context) => {
    // If not authenticated throw error
    if (!context.isAuth) {
      console.error(new Error("Non Authenticated"));
    }

    try {
      const role = await Role.findByIdAndUpdate(roleId, updateRole, {
        new: true,
      });

      return transformRole(role);
    } catch (err) {
      return console.error(err);
    }
  },
};

/**
 * User Subscriptions
 */

const RoleSubscription = {
  roleAdded: {
    subscribe: () => pubsub.asyncIterator([ROLE_ADDED]),
  },
};

export { RoleQueries, RoleMutation, RoleSubscription };
