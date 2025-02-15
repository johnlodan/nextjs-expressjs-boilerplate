
import mongoose from 'mongoose'

mongoose.set('strictQuery', true);

const InitiateMongoServer = async () => {
  try {
    let MONGOURI = ""
    if (process?.env?.APP_MONGODB_URI) {
      MONGOURI = process?.env?.APP_MONGODB_URI
    }
    await mongoose.connect(MONGOURI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    })
    if (process?.env?.APP_ENV) {
      console.log(`Database Connected & running @ ${process?.env?.APP_ENV.toUpperCase()}`)
    }
  } catch (e) {
    console.log("Cant Connect to the Database ", e)
    throw e
  }
}

export default InitiateMongoServer
