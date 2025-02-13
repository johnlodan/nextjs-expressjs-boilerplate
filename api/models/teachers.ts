import mongoose, { Document, Types, Schema, AggregatePaginateModel } from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

export interface ITeachers extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  subject: string;
  status?: number;
  updatedAt?: Date;
  createdAt?: Date;
}
const TeachersSchema: Schema = new mongoose.Schema<ITeachers>({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  subject: {
    type: String,
  },
  status: {
    type: Number,
    default: 1
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

TeachersSchema.plugin(aggregatePaginate);

const TeachersModel = mongoose.model<ITeachers, AggregatePaginateModel<ITeachers>>('teachers', TeachersSchema);
export default TeachersModel
