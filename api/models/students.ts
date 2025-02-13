import mongoose, { Document, Types, Schema, AggregatePaginateModel } from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

export interface IStudents extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  status?: number;
  updatedAt?: Date;
  createdAt?: Date;
}
const StudentsSchema: Schema = new mongoose.Schema<IStudents>({
  firstName: {
    type: String,
  },
  lastName: {
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

StudentsSchema.plugin(aggregatePaginate);

const StudentsModel = mongoose.model<IStudents, AggregatePaginateModel<IStudents>>('students', StudentsSchema);
export default StudentsModel
