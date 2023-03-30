import {User} from "./user";
import {Food} from "./food";

export interface Cart {
  id?: number;
  quantity?: number;
  userId?: User;
  foodId?: Food;
}
