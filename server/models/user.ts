import mongoose from "mongoose";

/**
 * User Schema
 */

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordConfirm: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Statics
 */

userSchema.statics = {
  /**
   * Get User
   * @param {ObjectId} id - The objectId of user.
   */
  get(id: string): mongoose.Document {
    return this.findById(id)
      .execAsync()
      .then((user: any) => {
        if (user) {
          return user;
        }
      });
  },
};

export default mongoose.model("User", userSchema);
