import {User} from "./user";
import {Food} from "./food";

export interface Cart {
  id?: number;
  quantity?: number;
  size?: string;
  userId?: User;
  foodId?: Food;
}
