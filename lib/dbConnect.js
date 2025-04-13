import mongoose from "mongoose";

let isConnected = false;

export const dbConnect = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/stork", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
  } catch (err) {
    throw err;
  }
};
