import { Comment } from "./comment";

export interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
    comments: Comment[];
    createdAt: string;
    __v: number;
  }