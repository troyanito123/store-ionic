import { User } from 'src/app/auth/interfaces/interface';
import { Product } from 'src/app/home/interfaces/interface';

export interface Order {
  id: number;
  total: string;
  address: string;
  location: string;
  delivered: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface OrderFull {
  id: number;
  total: string;
  address: string;
  location: string;
  delivered: boolean;
  created_at: Date;
  updated_at: Date;
  user: User;
  messages: Message[];
  details: Detail[];
}

export interface Detail {
  id: number;
  cant: number;
  subtotal: string;
  product: Product;
}

export interface Message {
  id: number;
  body: string;
  isAdmin: boolean;
  created_at: Date;
}
