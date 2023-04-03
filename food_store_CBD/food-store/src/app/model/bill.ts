import {User} from "./user";

export interface Bill {
  id?:number;
  buyDate?: string;
  total?: number;
  user?: User;
}
