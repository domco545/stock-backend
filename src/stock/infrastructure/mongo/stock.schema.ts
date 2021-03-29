import * as mongoose from 'mongoose';

export const StockSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
});
StockSchema.set('toJSON', {
    virtuals: true
});