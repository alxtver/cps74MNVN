import * as mongoose from 'mongoose';

export const systemCaseSchema = new mongoose.Schema(
    {
        serialNumber: {
            type: String,
            required: true,
            unique: true,
        },
        numberMachine: String,
        execution: {
            type: String,
            default: ''
        },
        fdsi: {
            type: String,
            required: true,
        },
        part: {
            type: String,
            required: true,
        },
        systemCaseUnits: Array,
        created: {
            type: Date,
            default: () => Date.now() + 3 * 60 * 60 * 1000, //время МСК
        },
        back_color: {
            type: String,
            default: "#8989a7",
        },
        attachment: {
            type: String,
            default: () => ''
        }
    },
    {
        versionKey: false,
    }
);

