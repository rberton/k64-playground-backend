import { gql } from "apollo-server-express";
import { ApolloServerExpressConfig } from "apollo-server-express";
import resolvers from "../resolvers/index";

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(userId: ID!): User
    login(email: String!, password: String!): AuthData!
    roles: [Role!]!
    role(roleId: ID!): Role!
  }
  type Mutation {
    createUser(userInput: UserInput): AuthData!
    updateUser(userId: ID!, updateUser: UpdateUser): User!
    setUser(userInput: UserInput): AuthData!
    createRole(roleInput: RoleInput): Role!
    updateRole(roleID: ID!, updateRole: UpdateRole): Role!
  }
  type Subscription {
    userAdded: User
    userConnected: User
    roleAdded: Role
  }
  type Role {
    _id: ID!
    label: String!
    users: [User]
  }
  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    passwordConfirm: Boolean!
    role: String!
    createdAt: String!
    updatedAt: String!
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  input UserInput {
    _id: ID
    firstname: String
    lastname: String
    email: String
    password: String
    passwordConfirm: Boolean
    role: String
  }
  input UpdateUser {
    firstname: String
    lastname: String
    email: String
    password: String
    passwordConfirm: Boolean
    role: String
  }
  input RoleInput {
    label: String!
  }
  input UpdateRole {
    label: String
  }
`;

const schema: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  introspection: true,
  context: async ({ req, connection, payload }: any) => {
    if (connection) {
      return { isAuth: payload.authToken };
    }

    return { isAuth: req.isAuth };
  },
  playground: true,
  engine: {
    reportSchema: true,
  },
};

export default schema;
