import { EventEmitter, Injectable } from '@angular/core';

import { Product } from 'src/app/home/interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart: Product[] = [];

  private _cantInCart = 0;

  private _costCart = 0;

  cantInCart$: EventEmitter<number> = new EventEmitter();
  costOfCart$: EventEmitter<number> = new EventEmitter();
  deleteProductFromCart$: EventEmitter<number> = new EventEmitter();

  get cart() {
    return [...this._cart];
  }

  get cantInCart() {
    return this._cantInCart;
  }
  get costCart() {
    return this._costCart;
  }

  constructor() {
    this._cart = JSON.parse(localStorage.getItem('cart')) || [];
    this._cantInCart = Number(localStorage.getItem('cant') || 0);
    this._costCart = Number(localStorage.getItem('cost') || 0);
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

  increaseCant(productId: number) {
    this._cart = this._cart.map((p) => {
      if (p.id === productId) {
        p.cant++;
      }
      return p;
    });
    this.saveCartToStorage();
  }

  decreaseCant(productId: number) {
    this._cart = this._cart.map((p) => {
      if (p.id === productId) {
        if (p.cant === 0) {
          return p;
        }
        p.cant--;
      }
      return p;
    });
    this.saveCartToStorage();
  }

  removeProductFromCart(productId: number) {
    this._cart = this._cart.filter((p) => p.id !== productId);
    this.deleteProductFromCart$.emit(productId);
    this.saveCartToStorage();
  }

  private saveCartToStorage() {
    const count = this._cart.reduce((counter, p) => counter + p.cant, 0);
    const cost = this._cart.reduce(
      (counter, p) => counter + p.cant * p.price,
      0
    );
    this.costOfCart$.emit(cost);
    this.cantInCart$.emit(count);
    localStorage.setItem('cart', JSON.stringify(this._cart));
    localStorage.setItem('cant', count.toString());
    localStorage.setItem('cost', cost.toString());
  }
}
