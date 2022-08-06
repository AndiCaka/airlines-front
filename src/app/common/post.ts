import {User} from "./user";
import {Review} from "./review";

export class Post {
  id: number;
  title: string;
  description: string;
  author: User;
  createdAt: Date;
  imageURL: string;
  reviews: Review[];
}
