import { EventEmitter, Injectable } from '@angular/core';

import { Product } from 'src/app/home/interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart: Product[] = [];

  private _cantInCart = 0;

  cantInCart$: EventEmitter<number> = new EventEmitter();

  get cart() {
    return [...this._cart];
  }

  get cantInCart() {
    return this._cantInCart;
  }

  constructor() {
    this._cart = JSON.parse(localStorage.getItem('cart')) || [];
    this._cantInCart = Number(localStorage.getItem('cant') || 0);
  }

  addToCart(product: Product) {
    const productInList = this._cart.find((p) => p.id === product.id);
    if (!productInList) {
      const newProduct = { ...product };
      newProduct.cant = 1;
      this._cart.push(newProduct);
      this.saveCartToStorage();
    } else {
      this._cart = this._cart.map((p) => {
        if (p.id === product.id) {
          p.cant++;
        }
        return p;
      });
      this.saveCartToStorage();
    }
  }

  removeToCart(productId: number) {
    const productInList = this._cart.find((p) => p.id === productId);
    if (productInList) {
      const product = { ...productInList };
      if (product.cant < 2) {
        this._cart = this._cart.filter((p) => p.id !== productId);
        this.saveCartToStorage();
      } else {
        this._cart = this._cart.map((p) => {
          if (p.id === product.id) {
            p.cant--;
          }
          return p;
        });
        this.saveCartToStorage();
      }
    }
  }

  private saveCartToStorage() {
    const count = this._cart.reduce((counter, p) => counter + p.cant, 0);
    this.cantInCart$.emit(count);
    localStorage.setItem('cart', JSON.stringify(this._cart));
    localStorage.setItem('cant', count.toString());
  }
}
