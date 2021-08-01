import * as mongoose from 'mongoose';

export const eanSchema = new mongoose.Schema(
  {
    type_pki: {
      type: String,
      required: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    ean_code: String,
    created: {
      type: Date,
      default: () => Date.now() + 3 * 60 * 60 * 1000, // время МСК
    },
    countSymbols: {
      type: Number,
      default: false,
    },
    sp_unit: Array,
    sp_unit1: Array,
  },
  {
    versionKey: false,
  },
);
