import {Bill} from "./bill";
import {Food} from "./food";

export interface BillHistory {
  id:number;
  bill:Bill;
  food:Food;
  size:string;
  quantity:number;
}
