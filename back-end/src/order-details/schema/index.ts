import * as mongoose from 'mongoose';

export const OrderDetailSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quantity: {
        type: Number,
        required: true
    }
})