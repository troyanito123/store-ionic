export interface Product {
  id: number;
  name: string;
  code: string;
  price: number;
  description: string;
  status: string;
  unit: Unit;
  images: Image[];
  inCart: boolean;
}

export interface Image {
  id: number;
  url: string;
}

export interface Unit {
  id: number;
  code: string;
  name: string;
  description: string;
}
