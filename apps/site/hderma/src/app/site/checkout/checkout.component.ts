import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UsersService } from '../../shared/users.service';
import { DangkyService } from '../../admin/dangky/dangky.service';
import { WishlistService } from '../wishlist/wishlist.service';
import { CheckoutService } from './checkout.service';
import { AccountNotificationsService } from '../../admin/account-notifications/account-notifications.service';
import { LocalStorageService } from '../../shared/localstorage.service';
import { GenId, GetImage} from '../../shared/shared.utils';
import { GiohangService } from '../../shared/giohang.service';
import { ApiVNPAYService } from '../../shared/apivnpay.service';
@Component({
  selector: 'taza-base-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  private readonly notifier: NotifierService;
  token = this._LocalStorageService.getItem('TazagroupToken') || null;
  giohang = this._LocalStorageService.getItem('giohang') || [];
  diachi!: any;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  codeTp!: any;
  diachichitiet!: any;
  phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  carts!: any[];
  total!: number;
  khachhangForm!: any;
  donhangForm!: any;
  TenTP!: any;
  TenQuanHuyen!: any;
  phiship!: number;
  countDown = 5;
  interval: any;
  Khachhang:any={};
  DonhangChitiet:any={};
  ListUser:any[]=[]
  Thanksdata:any;
  CUser:any={}
  Diachis:any[]=[]
  editThongtin:boolean=false
  options: any = {
    componentRestrictions: { country: 'VN' }
  } 
  constructor(
    private cartService: GiohangService,
    private fb: FormBuilder,
    private _checkoutService: CheckoutService,
    notifierService: NotifierService,
    private _dangkyService: DangkyService,
    private _route: ActivatedRoute,
    private _wishlistService: WishlistService,
    private _router: Router,
    private _usersService: UsersService,
    public _dialog: MatDialog,
    public _accountNotificationsService: AccountNotificationsService,
    public _LocalStorageService: LocalStorageService,
    public _ApiVNPAYService: ApiVNPAYService,
  ) {
    this.notifier = notifierService;
  } 
  ngOnInit(): void {
    this.cartService.getCarts()
    this.cartService.carts$.subscribe((res) => {
      this.carts = res;
    });
    this.cartService.total$.subscribe((res) => (this.total = res));
    if(this.token!=null){
      this._usersService.getProfile().subscribe((res:any) => {  
        if (res) {         
          this.CUser = res          
           //  this.ListUser.push({id:res.id,Role:'user'})
          //this._usersService.getUserByid(res.ref_id).subscribe((v)=>{if(v){this.ListUser.push({id:v.id,Role:'parent'})}})
          // this._usersService.getAdmin().subscribe((v)=>{if(v){
          //   const admin = v.map(admin=>{
          //    return {id:admin.id,Role:'admin'}
          //   })
          //   this.ListUser = [...new Set(this.ListUser.concat(admin))];
          // }})
          this.Khachhang.idKH = res.id;
          this.Khachhang.Hoten = res.Hoten;
          this.Khachhang.email = res.email;
          this.Khachhang.SDT = res.SDT;
          this.Khachhang.Diachi = this.CUser.Diachi.find((v:any)=>v.Active==true) 
          this.Diachis =  this.CUser.Diachi
        }
      });
    }
  }
  GetImage(data:any)
  {
    return GetImage(data)
  }
  Total(items:any)
  {
    return items.reduce((acc:any, item:any) => acc + item.soluong * item.Gia, 0)
  }
  GetDiachi(value:any)
  { 
    console.log(value);
    this.Khachhang.Diachi = value.find((v:any)=>v.Active==true)  
    console.log(this.Khachhang.Diachi);
  }
  SetPayment(value:any)
  {
    this.Khachhang.Payment = value
  }
  DatHang(Khachhang:any) {
    if (!Khachhang.Hoten) {
      this.notifier.notify('error', `Vui lòng nhập Họ và tên`);
    }
    else if (!Khachhang.SDT) {
      this.notifier.notify('error', `Vui lòng nhập SDT`);
    }
    else if(!this.phoneRegex.test(Khachhang.SDT))
    {
      this.notifier.notify('error', `Số Điện Thoại Không Hợp Lệ`);
    }
    else if (!Khachhang.email) {
      this.notifier.notify('error', `Vui lòng nhập Email`);
    }
    else if(!this.emailPattern.test(Khachhang.email))
    {
      this.notifier.notify('error', `Sai định dạng email`);
    }
    else if (!Khachhang.Diachi) {
      this.notifier.notify('error', `Vui lòng nhập địa chỉ`);
    }
    else if (!Khachhang.Payment) {
      this.notifier.notify('error', `Chọn Hình Thức Thanh Toán`);
    }
    else
    {
    if (this.carts.length > 0) {
      let VNPAY ={}
      const MaDonHang =GenId(8,false)
      Khachhang.MaDonHang = `DH${MaDonHang}`;
      Khachhang.TotalAmount = this.Total(this.carts)
      this._checkoutService
        .postdonhang(Khachhang)
        .subscribe((res:any) => {
          if (res) {
            this.carts.forEach((x) => {
              this.DonhangChitiet.idDH = res.id;
              this.DonhangChitiet.idSP = x.id;
              this.DonhangChitiet.soluong = x.soluong;
              this.DonhangChitiet.GiaSale = x.GiaSale;
              this.DonhangChitiet.Gia = x.Gia;
              this.DonhangChitiet.idGioithieu = x.idGioithieu;
              this._checkoutService
                .postdonhangchitiet(this.DonhangChitiet)
                .subscribe((res) => {
                  console.log(res);           
                  this.cartService.removeFromCart(x)
                  if (this.carts.length == 0) {
                    this.cartService.EmptyCart();
                    if(Khachhang.Payment == 'VNPAY')
                    {
                      const VNPAYLInk = this._ApiVNPAYService.getLink(Khachhang.MaDonHang,Khachhang.TotalAmount);     
                      window.location.href = VNPAYLInk      
                    }
                    else
                    {
                      
                    }
                  //  this.notifier.notify('success', `Đặt hàng thành công`);
                    // if(this.token!=null)
                    // {
                    // this._router.navigate(['profile/donhang']);
                    //  }
                    // else
                    // {        
                    //   const extras: NavigationExtras = {
                    //     state: {
                    //       data: this.Thanksdata
                    //     }
                    //   };
                    // this._router.navigate(['camon'],extras);
                    // }
                  }
                });

            });
          }
        });
    } else {
      this.notifier.notify('error', `Bạn chưa có đơn hàng`);
    }
  }
  }
}
