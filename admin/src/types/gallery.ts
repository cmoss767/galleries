export interface Gallery {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  imageCount: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  createdAt: string;
  order: number;
} 