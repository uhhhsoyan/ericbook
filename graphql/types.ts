export type PostLike = {
  username: string;
  createdAt: string;
};

export type PostComment = {
  id: string;
  body: string;
  username: string;
  createdAt: string;
};

export type Post = {
  body: string;
  createdAt: string;
  id: string;
  username: string;
  likeCount: number;
  commentCount: number;
  likes: PostLike[];
  comments: PostComment[];
};
