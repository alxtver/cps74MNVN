import * as mongoose from 'mongoose';

export const partSchema = new mongoose.Schema(
    {
        part: {
            type: String,
            required: true,
            unique: true
        },
        created: {
            type: Date,
            default: () => Date.now() + 3 * 60 * 60 * 1000, // время МСК
        }
    },
    {
        versionKey: false,
    }
);
