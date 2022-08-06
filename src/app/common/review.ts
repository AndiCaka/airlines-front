import {User} from "./user";

export class Review {
  id: number;
  body: string;
  user: User;
  createdAt: Date;
}
