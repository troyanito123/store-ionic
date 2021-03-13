import { Unit } from 'src/app/units/interfaces/interfaces';

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
  cant: number;
}

export interface Image {
  id: number;
  url: string;
}
