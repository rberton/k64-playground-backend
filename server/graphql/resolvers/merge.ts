import dateToString from "../../helpers/date";
import User from "../../models/user";
import Role from "../../models/role";

/**
 * Get user object with schema typing
 * @param id
 */

const getUser = async (id: string) => {
  try {
    const user: any = await User.findById(id);

    return {
      ...user._doc,
      _id: user.id,
      createdAt: dateToString(user._doc.createdAt),
      updatedAt: dateToString(user._doc.updatedAt),
    };
  } catch (err) {
    console.error(err);
  }
};

/**
 * Get user object with schema typing
 * @param user
 */

const transformUser = async (user: any) => {
  try {
    const role = getRole(user.role);

    return {
      ...user._doc,
      _id: user.id,
      role,
      createdAt: dateToString(user._doc.createdAt),
      updatedAt: dateToString(user._doc.updatedAt),
    };
  } catch (err) {
    console.error(err);
  }
};

/**
 * Get role object with schema typing
 * @param id
 */

const getRole = async (label: string) => {
  try {
    const role: any = await Role.findOne({ label: label });

    return {
      ...role._doc,
      _id: role.id,
      createdAt: dateToString(role._doc.createdAt),
      updatedAt: dateToString(role._doc.updatedAt),
    };
  } catch (err) {
    console.error(err);
  }
};

/**
 * Get role object with schema typing
 * @param user
 */

const transformRole = (role: any) => {
  return {
    ...role._doc,
    _id: role.id,
    createdAt: dateToString(role._doc.createdAt),
    updatedAt: dateToString(role._doc.updatedAt),
  };
};

export { getUser, transformUser, getRole, transformRole };
