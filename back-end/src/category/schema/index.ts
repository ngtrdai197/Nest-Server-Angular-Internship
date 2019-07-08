import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    products: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    ]

})