import mongoose from 'mongoose';
import { connection as connectionOptions } from '../config/mongo-connection';

export default class DbService {

  public async createMongoConnection(): Promise<void> {
    if (!connectionOptions) {
      throw new Error('No connection details found');
    } else if (!connectionOptions.options) {
      throw new Error('No connection options fouhd');
    } else if (!connectionOptions.dbUrl) {
      throw new Error('No database url found');
    }

    const mongooseConnection = await mongoose.connect(connectionOptions.dbUrl, connectionOptions.options);

    if (mongooseConnection) {
      console.log(`Connected to MongoDB at url: ${connectionOptions.host} in environment: ${connectionOptions.env}`)
    } else {
      throw new Error(`Unable to connect to MongoDb at url ${connectionOptions.host}`)
    }
  }
}