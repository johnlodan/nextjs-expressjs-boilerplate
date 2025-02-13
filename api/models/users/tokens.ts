import mongoose, { Document, Types, Schema } from 'mongoose'

export interface ITokens extends Document {
  _id: Types.ObjectId;
  userId?: Types.ObjectId;
  token?: string;
  createdAt?: Date;
}

const TokensSchema: Schema = new mongoose.Schema<ITokens>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const TokensModel = mongoose.model<ITokens>('tokens', TokensSchema);
export default TokensModel

