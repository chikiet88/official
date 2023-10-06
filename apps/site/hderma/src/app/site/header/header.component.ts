import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { MatDialog } from '@angular/material/dialog';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { GiohangService } from '../../shared/giohang.service';
import { AuthService } from '../../admin/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../shared/users.service';
import { getInitials } from '../../shared/shared.utils';
import { LocalStorageService } from '../../shared/localstorage.service';
import { BaivietService } from '../../shared/baiviet.service';
import { ProductService } from '../../admin/product/product.service';
import { SanphamService } from '../../shared/sanpham.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token: any = this._LocalStorageService.getItem('TazagroupToken') || null
  Menus: any[] = [
    { id: 1, Title: 'Trang Chủ', Slug: '/' },
    { id: 2, Title: 'Sản Phẩm', Slug: 'san-pham' },
    { id: 3, Title: 'Về Hderma', Slug: 've-chung-toi' },
    {
      id: 4, Title: 'Góc Chia Sẻ', Slug: 'bai-viet',
      children: [
        { id: 1, Title: 'Tin Tức', Slug: 'blog/tin-tucs' },
        { id: 2, Title: 'Từ Điển Thành Phần', Slug: 'blog/tu-dien-thanh-phan' },
        { id: 3, Title: 'Kiến Thức Chăm Sóc Da', Slug: 'blog/kien-thuc-cham-soc-da' },
      ]
    },
    { id: 5, Title: 'Liên Hệ', Slug: 'lien-he' },
    // { id: 6, Title: 'Routine', Slug: 'routine-canhan' },
    {
      id: 6, Title: 'Routine', Slug: '/',
      children: [
        { id: 1, Title: 'Tạo Routine', Slug: 'routine-canhan' },
        { id: 2, Title: 'Lịch Sử Routine', Slug: 'lichsu-routine' },
      ]
    },
  ]
  hasChild = (_: number, node: any) => node.expandable;
  carts: any[] = [];
  total: number = 0;
  soluong: number = 0;
  CUser:any={Shortname:''}
  ListsBaiviet:any[]=[]
  ListsSanpham:any[]=[]
  constructor(
    private _maincomponent: MainComponent,
    private dialog: MatDialog,
    private _cartService: GiohangService,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _UsersService: UsersService,
    private _LocalStorageService: LocalStorageService,
    private _BaivietService: BaivietService,
    private _SanphamService: SanphamService,

  ) {}

  ngOnInit() {
    if(this.token)
    {
    this._UsersService.getProfile().subscribe()
    this._UsersService.profile$.subscribe((data: any) => {
      if (data) {
        this.CUser = data
        this.CUser.Shortname = getInitials(this.CUser.Hoten).slice(-2);        
      }
    })
    }
    this._cartService.getCarts()
    this._cartService.carts$.subscribe((res) => {
      if (res) {
        this.carts = res;
        this.soluong = this.carts.reduce((soluong, item) => soluong + item.soluong, 0);
        this.total = this.carts.reduce((total, item) => total + (item.Gia * item.soluong), 0);
      }
    });
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 2) {
      this._BaivietService.searchBaiviet(value).subscribe((data:any)=>
        {
          console.log(data);
          this.ListsBaiviet = data
       })
      this._SanphamService.searchBaiviet(value).subscribe((data:any)=>
        {
          console.log(data);
          this.ListsSanpham = data
       })
    }
  }

  OpenMenu() {
    this._maincomponent.drawer.open()
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
  }
  Opencart()
  {
    this._maincomponent.Cartdrawer.open()
  }
  Dangxuat() {
    this._authService.Dangxuat().subscribe((res) => {
      if (res == true) {
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/';
        this._router.navigate(['']);
        location.reload();
      }
    });
  }
}