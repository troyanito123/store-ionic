export interface Order {
  id: number;
  total: string;
  address: string;
  location: string;
  delivered: boolean;
  created_at: Date;
  updated_at: Date;
}
