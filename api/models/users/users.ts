import mongoose, { Document, Types, Schema, AggregatePaginateModel } from 'mongoose'

export interface IUsers extends Document {
  _id: Types.ObjectId;
  lastName?: string;
  firstName?: string;
  email?: string;
  password?: string;
  status?: number;
  updatedAt?: Date;
  createdAt?: Date;
}

const UsersSchema: Schema = new mongoose.Schema<IUsers>({
  lastName: {
    type: String,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  status: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


UsersSchema.set('toObject', {
  transform: (_doc: any, ret: any) => {
    delete ret.password;
    return ret;
  }
});

const UsersModel = mongoose.model<IUsers, AggregatePaginateModel<IUsers>>('users', UsersSchema);
export default UsersModel