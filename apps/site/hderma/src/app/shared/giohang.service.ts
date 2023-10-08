import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './localstorage.service';
@Injectable({
  providedIn: 'root'
})
export class GiohangService {
  private _carts: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _total: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _soluong: BehaviorSubject<any | null> = new BehaviorSubject(null);
  constructor(private localStorageService: LocalStorageService) {}
  get carts$(): Observable<any[]> {
    return this._carts.asObservable();
  }
  get total$(): Observable<any> {
    return this._total.asObservable();
  }
  get soluong$(): Observable<any> {
    return this._soluong.asObservable();
  }
  addToCart(item: any): void {       
    const carts = this.localStorageService.getItem('giohang')||[]
    const existingItem = carts.find((v:any) => v.id === item.id);
    if (existingItem) {
      existingItem.soluong += item.soluong;
    } else {
      carts.push(item);
    }
    this._carts.next(carts);
    this.localStorageService.setItem('giohang',carts)
  }
removeFromCart(item: any): void {
  const carts = this.localStorageService.getItem('giohang')||[]
    const index = carts.findIndex((v:any) => v.id === item.id);   
    if (index !== -1) {
      carts.splice(index, 1);
    }
    this._carts.next(carts);
    this.localStorageService.setItem('giohang',carts)
  }
EmptyCart(): void {
    const carts:any = []
    this._carts.next(carts);
    this.localStorageService.setItem('giohang',carts)
}
  updateQuantity(item: any, Upadatesoluong: number): void {
    const carts = this.localStorageService.getItem('giohang')||[]
    const itemIndex = carts.findIndex((v:any) => v.id === item.id);
    if (itemIndex !== -1) {
          carts[itemIndex].soluong = Upadatesoluong;
    }
    else
    {
      item.soluong = Upadatesoluong
      carts.push(item);
    }
    this._carts.next(carts);
    this.localStorageService.setItem('giohang',carts)
  }
  getCarts() {
    const carts = this.localStorageService.getItem('giohang')||[]
    this._carts.next(carts);
  }
  // calculateTotal() {
  //   const total = this.carts.reduce((total, item) => total + (item.Gia * item.soluong), 0);
  //   this._total.next(total);
  //   const soluong = this.carts.reduce((soluong, item) => soluong + item.soluong, 0);
  //   this._soluong.next(soluong);
  // }
}
