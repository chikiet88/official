import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { MainComponent } from '../main/main.component';
import { GetImage } from '../../shared/shared.utils';
import { GiohangService } from '../../shared/giohang.service';

@Component({
  selector: 'taza-base-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() isShowCart!: boolean;
  product!: any;
  soluong: number = 0;
  total: number = 0;
  carts: any[] = [];
  constructor(
    private _cartService: GiohangService,
    private _router: Router,
    private _notifierService: NotifierService,
    private _MainComponent: MainComponent,


  ) { }
  removeItem(item: any) {
    this._cartService.removeFromCart(item)
  }
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace'];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
  onBlur(i: any) {
    if (this.carts[i].soluong == null || this.carts[i].soluong == 0) {
      this.carts[i].soluong = 1;
    }
  }
  ngOnInit(): void {
    this._cartService.getCarts()
    this._cartService.carts$.subscribe((res) => {
      if (res) {
        this.carts = res; 
        this.total = this.carts.reduce((total, item) => total + (item.Gia * item.soluong), 0);
      }
    });
  }
  DrawToggle() {
    this._MainComponent.Cartdrawer.close();
  }
  Dathang() {
    this._MainComponent.Cartdrawer.close();
    this._router.navigate(['checkout']);
  }
  updateCart(item: any, soluong: number) {
    console.log(soluong);
    if (soluong > 0) {
      this._cartService.updateQuantity(item, soluong)
    }
  }
  RemoveCarts()
  {
    this._cartService.EmptyCart();
  }
  GetImage(data: any){
    if (data && data.Hinhanh) {
      return GetImage(data.Hinhanh);
    } else {
      return "assets/images/logo.svg";
    }
  }
}
