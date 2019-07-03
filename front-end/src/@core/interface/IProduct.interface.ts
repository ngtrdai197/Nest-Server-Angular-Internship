export interface IProduct {
  _id?: String;
  productName: String;
  title: String;
  current_price: Number;
  category: String
  old_price?: Number;
  discount?: Number;
  description?: String
  images?: String[];
}
