import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    createdDate: {
        type: Date,
        default: new Date
    },
    payments: {
        type: String,
        default: "Nhận tiền khi giao dịch"
    },
    total: {
        type: Number,
        required: true
    },
    statePayment: {
        type: Boolean,
        default: false
    },
    orderDetails: {
        type: mongoose.Schema.Types.ObjectId, ref: 'OrderDetails',
        required: true
    }
});