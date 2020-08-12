import { UserMutation, UserQueries, UserSubscription } from "./user";
import { RoleMutation, RoleQueries, RoleSubscription } from "./role";

const rootResolver = {
  Query: {
    ...UserQueries,
    ...RoleQueries,
    // Add other queries here
  },
  Mutation: {
    ...UserMutation,
    ...RoleMutation,
    // Add other mutations here
  },
  Subscription: {
    ...UserSubscription,
    ...RoleSubscription,
    // Add other subscriptions here
  },
};

export default rootResolver;
