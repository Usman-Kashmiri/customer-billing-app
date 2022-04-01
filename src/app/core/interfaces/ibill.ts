import { ICategory } from "./icategory";
import { ISubCategory } from "./isub-category";
import { IUser } from "./iuser";

export interface IBill {
  id? : number;
  name? : string;
  amount? : number;
  paid? : boolean;
  due_date? : Date;
  created_at? : Date;
  updated_at? : Date;
  subcategory? : ISubCategory;
  category? : ICategory;
  user? : IUser;
  paginator? : any;
}
