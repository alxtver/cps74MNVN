import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    group: {
        type: String,
        required: true,
    },
    lastPart: String,
    lastType: String,
    lastPage: Number,
    pcCount: String,
    lastAssemblyPC: String,
    lastApkzi: Object,
    lastPki: Object,
    company: String,
});
