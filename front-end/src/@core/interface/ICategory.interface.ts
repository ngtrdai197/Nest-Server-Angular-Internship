import { IProduct } from './IProduct.interface';

export interface ICategory{
  _id?: String;
  categoryName: String;
  products?: IProduct |String[]
}
