import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Rating from './ratingmodel.js';
dotenv.config();

const mongoURI = process.env.MONGO_DB;

const populateDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    
    // Dynamically import the JSON file
    const ratings = await import('./rating.json', {
      assert: { type: 'json' }
    });
    
    // Insert ratings
    await Rating.deleteMany();
    await Rating.insertMany(ratings.default);
    console.log("Medicines added successfully!");
    process.exit();
  } catch (error) {
    console.error("Error populating database:", error);
    process.exit(1);
  }
};

populateDB();
