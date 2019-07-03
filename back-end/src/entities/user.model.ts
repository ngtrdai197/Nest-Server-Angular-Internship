import * as mongoose from "mongoose";

export interface IUser {
  id?: string;
  username: string;
  password: string;
}

export interface IUserModel extends IUser, mongoose.Document {
  id: string;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);
userSchema.virtual("id").get(function(this: any) {
  return this._id.toHexString();
});

export const userModel = mongoose.model<IUserModel>("user", userSchema);
