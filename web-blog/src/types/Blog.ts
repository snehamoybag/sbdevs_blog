export interface Blog {
  id: number;
  title: string;
  content: string;
  imageUrls: string[];
  date: { createdAt: string; updatedAt?: string };
  category: string;
  tags?: string[];
  author: {
    id: number;
    name: string;
    bio?: string;
    avatarUrl?: string;
  };
  interactionsCount: { like: number; comment: number };
  userInteractions: { like: boolean; comment: boolean };
}
