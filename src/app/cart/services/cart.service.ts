import { EventEmitter, Injectable } from '@angular/core';

import { Product } from 'src/app/home/interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart: Product[] = [];

  private _cantInCart = 0;

  private _costCart = 0;

  private _location;

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

  get location() {
    return this._location;
  }

  constructor() {
    this._cart = JSON.parse(localStorage.getItem('cart')) || [];
    this._cantInCart = Number(localStorage.getItem('cant') || 0);
    this._costCart = Number(localStorage.getItem('cost') || 0);
    this._location = localStorage.getItem('location') || null;
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

  setLocation(location: string) {
    localStorage.setItem('location', location);
    this._location = location;
  }

  deleteCart() {
    this._cart = [];
    localStorage.removeItem('location');
    this._location = null;
    this.saveCartToStorage();
  }

  private saveCartToStorage() {
    this._cantInCart = this._cart.reduce((counter, p) => counter + p.cant, 0);
    this._costCart = this._cart.reduce(
      (counter, p) => counter + p.cant * p.price,
      0
    );
    this.costOfCart$.emit(this._costCart);
    this.cantInCart$.emit(this.cantInCart);
    localStorage.setItem('cart', JSON.stringify(this._cart));
    localStorage.setItem('cant', this._cantInCart.toString());
    localStorage.setItem('cost', this.costCart.toString());
  }
}
