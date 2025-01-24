export interface CreateGalleryRequest {
  name: string;
  description: string;
  userId: string;
  theme?: string;
}

export interface CreateUserRequest {
  email: string;
  displayName: string;
  role: 'user' | 'admin';
}

export interface GenerateUrlRequest {
  fileName: string;
  contentType: string;
  galleryId: string;
  userId: string;
}

export interface Gallery {
  id: string;
  name: string;
  description: string;
  userId: string;
  theme: string;
  createdAt: string;
  updatedAt: string;
  imageCount: number;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
  galleryCount: number;
} 