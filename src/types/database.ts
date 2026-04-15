export type UserRole = 'user' | 'seller' | 'admin';

export interface Profile {
  id: string;
  updated_at: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  bio: string | null;
  craft_story: string | null;
}

export interface Product {
  id: string;
  seller_id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  created_at: string;
}

export interface ProductWithSeller extends Product {
  profiles: Profile;
}
