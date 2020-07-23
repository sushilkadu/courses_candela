import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Successfully connected to Course DB");
  } catch (err) {
    console.log("Error connecting to Course DB: ", err);
  }
};

app.listen(4000, () => {
  console.log("Course Service is listening on port 4000");
});

start();
