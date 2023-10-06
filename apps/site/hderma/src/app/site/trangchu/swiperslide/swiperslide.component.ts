import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetImage } from '../../../shared/shared.utils';
import { NotifierService } from 'angular-notifier';
import { GiohangService } from '../../../shared/giohang.service';

@Component({
  selector: 'app-swiperslide',
  templateUrl: './swiperslide.component.html',
  styleUrls: ['./swiperslide.component.css']
})
export class SwiperslideComponent implements OnInit {
  @Input() data: any;
  @Input() config: any;
  @Output() childEvent = new EventEmitter<any>();
  itemCart:any={soluong:0};
  constructor(
    private _cartService: GiohangService,
    private _NotifierService: NotifierService,
  ) { }
  ngOnInit() {
  }
  GetImage(data: any){
    if (data && data.Hinhanh && data.Hinhanh.hinhchinh && data.Hinhanh.hinhchinh.spath) {
      return GetImage(data.Hinhanh.hinhchinh.spath);
    } else {
      return "assets/images/logo.svg";
    }
  }
  addtocart(data:any)
  {
    this.itemCart.id = data.id,
    this.itemCart.soluong = 1,
    this.itemCart.Gia = data.Gia,
    this.itemCart.GiaSale = data.GiaSale,
    this.itemCart.Hinhanh = data.Hinhanh.hinhchinh.spath,
    this.itemCart.Tieude = data.Tieude,
    this.itemCart.Slug = data.Slug,
    this._cartService.addToCart(this.itemCart);
    this._NotifierService.notify('success',`Đã Thêm ${data.SKU} vào giỏ hàng`)
  }
}
