import * as mongoose from 'mongoose';

export const countrySchema = new mongoose.Schema(
  {
    country: {
      type: String,
    },
    fullName: {
      type: String,
    },
  },
  {
    versionKey: false,
  },
);
