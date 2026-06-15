const mongoose = require('mongoose');
const { getLocalCollection } = require('./localDb');

let useLocalDb = false;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn('⚠️ No MONGO_URI environment variable specified.');
    console.warn('⚠️ Portfolio backend is running in high-reliability fallback mode: using local JSON file database.');
    useLocalDb = true;
    return;
  }

  try {
    // Attempt connecting with a short timeout to prevent blocking startup
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 4000
    });
    console.log('✅ MongoDB Database connected successfully.');
  } catch (err) {
    console.error(`❌ MongoDB connection failed: ${err.message}`);
    console.warn('⚠️ Falling back to local JSON database service.');
    useLocalDb = true;
  }
};

const getModelWrapper = (modelName, mongooseModel) => {
  return {
    find: async (filter = {}) => {
      if (useLocalDb) {
        return await getLocalCollection(modelName).find(filter);
      }
      return await mongooseModel.find(filter).lean();
    },
    findOne: async (filter = {}) => {
      if (useLocalDb) {
        return await getLocalCollection(modelName).findOne(filter);
      }
      return await mongooseModel.findOne(filter).lean();
    },
    findById: async (id) => {
      if (useLocalDb) {
        return await getLocalCollection(modelName).findById(id);
      }
      return await mongooseModel.findById(id).lean();
    },
    create: async (data) => {
      if (useLocalDb) {
        return await getLocalCollection(modelName).create(data);
      }
      const instance = new mongooseModel(data);
      const saved = await instance.save();
      return saved.toObject();
    },
    findByIdAndUpdate: async (id, update, options = { new: true }) => {
      if (useLocalDb) {
        return await getLocalCollection(modelName).findByIdAndUpdate(id, update, options);
      }
      return await mongooseModel.findByIdAndUpdate(id, update, options).lean();
    },
    findByIdAndDelete: async (id) => {
      if (useLocalDb) {
        return await getLocalCollection(modelName).findByIdAndDelete(id);
      }
      return await mongooseModel.findByIdAndDelete(id).lean();
    },
    countDocuments: async (filter = {}) => {
      if (useLocalDb) {
        return await getLocalCollection(modelName).countDocuments(filter);
      }
      return await mongooseModel.countDocuments(filter);
    }
  };
};

module.exports = {
  connectDB,
  getModelWrapper,
  isLocal: () => useLocalDb
};
