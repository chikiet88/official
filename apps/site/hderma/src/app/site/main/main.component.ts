import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { WishlistService } from '../wishlist/wishlist.service';
import { MatDrawer } from '@angular/material/sidenav';
import { LocalStorageService } from '../../shared/localstorage.service';
import { GiohangService } from '../../shared/giohang.service';
@Component({
  selector: 'taza-base-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  token: any = this._LocalStorageService.getItem('hderma_token')||null;
  soluong: any = JSON.parse(this._LocalStorageService.getItem('soluong') || '0');
  soluong$:any
  wishlists: any = [];
  CUser:any;
  Menus: any[] = [
    { id: 1, Title: 'Trang Chủ', Slug: '/' },
    { id: 2, Title: 'Sản Phẩm', Slug: 'san-pham' },
    { id: 3, Title: 'Về Hderma', Slug: 've-chung-toi' },
    {
      id: 4, Title: 'Góc Chia Sẻ', Slug: 'bai-viet',
      children: [
        { id: 1, Title: 'Tin Tức', Slug: 'blog/tin-tucs' },
        { id: 1, Title: 'Từ Điển Thành Phần', Slug: 'blog/tu-dien-thanh-phan' },
        { id: 1, Title: 'Kiến Thức Chăm Sóc Da', Slug: 'blog/kien-thuc-cham-soc-da' },
      ]
    },
    { id: 5, Title: 'Liên Hệ', Slug: 'lien-he' },
    {
      id: 6, Title: 'Routine', Slug: '/',
      children: [
        { id: 1, Title: 'Tạo Routine', Slug: 'routine-canhan' },
        { id: 2, Title: 'Lịch Sử Routine', Slug: 'lichsu-routine' },
      ]
    },
  ]
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild('Cartdrawer', { static: true }) Cartdrawer!: MatDrawer;
  constructor(
    private _cartService: GiohangService,
    private _wishlistService: WishlistService,
    private _LocalStorageService: LocalStorageService,
  ) {}
  isOpenCart$:any;
  ngOnInit(): void {   
    this.soluong$ = this._cartService.soluong$;
    this._cartService.soluong$.subscribe((res) => {
      if (res) {
        this.soluong = res;
      }
    });
  }
}