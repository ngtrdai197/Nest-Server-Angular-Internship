import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  description: String,
  oldPrice: Number,
  discount: Number,
  images: [
    {
      type: String,
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  productTotal: {
    type: Number,
    required: true,
  },
  productAvailable: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
  },
  productBoughtBy: new mongoose.Schema({
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    boughtAtDate: {
      type: Date,
      required: true,
    },
  }),
});
