export type TResponsePost = {
  id: number;
  message: string;
  likesCount: number;
  imageUrl?: string;
  userId: number;
  userImageUrl?: string;
  userFullName?: string;
  createdAt: string;
};
