import mongoose from "mongoose";

/**
 * Role Schema
 */

const roleSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    label: {
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

roleSchema.statics = {
  /**
   * Get Role
   * @param {ObjectId} id - The objectId of role.
   */
  get(id: string): mongoose.Document {
    return this.findById(id)
      .execAsync()
      .then((role: any) => {
        if (role) {
          return role;
        }
      });
  },
};

export default mongoose.model("Role", roleSchema);
