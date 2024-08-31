import mongoose from 'mongoose';

const dbUri = process.env.MONGODB_URI;

if (!global._mongooseClient) {
  global._mongooseClient = mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
}

export default global._mongooseClient;
