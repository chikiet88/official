import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { BaivietService } from '../../shared/baiviet.service';
import { ProductService } from '../../admin/product/product.service';
import { TagsService } from '../../admin/tags/tags.service';
import { DangkyService } from '../../admin/dangky/dangky.service';
import { GetImage } from '../../shared/shared.utils';
import { LocalStorageService } from '../../shared/localstorage.service';
import { GiohangService } from '../../shared/giohang.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'taza-base-trangchu',
  templateUrl: './trangchu.component.html',
  styleUrls: ['./trangchu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TrangchuComponent implements OnInit {
  config!: any;
  configProduct!: any;
  confighomepage!: any;
  configdanhgia!: any;
  APITINYMCE!: string;
  items!: any
  itemsMobile: any = [];
  hotProduct!: any
  bestSeller!: any
  wishlists!:any
  data: any = [{}];
  Lydo:any[]=[
    {id:1,Content1:'THANH TOÁN AN TOÀN',Content2:'Đơn giản - An toàn - Không chút rắc rối mà lại an tâm tuyệt đối',Icon:'https://hderma.vn/assets/images/secure-payment-icon.svg'},
    {id:2,Content1:'GIAO HÀNG NHANH',Content2:'Tối ưu chi phí vận chuyển đến 63 quận/ huyện tỉnh thành toàn quốc.',Icon:'https://hderma.vn/assets/images/fast-shipping.svg'},
    {id:3,Content1:'ƯU ĐÃI ĐỘC QUYỀN',Content2:'Đăng ký thành viên để được hưởng trợ giá và đặc quyền ưu đãi.',Icon:'https://hderma.vn/assets/images/discount-icon.svg'},
    {id:4,Content1:'TƯ VẤN CHUYÊN GIA',Content2:'Hỗ trợ tư vấn 24/7 giúp rút ngắn lộ trình điều trị - An toàn - Hiệu quả',Icon:'https://hderma.vn/assets/images/services-support.svg'},
  ];
  Sanphams:any[]=[]  
  token: any = this._LocalStorageService.getItem('TazagroupToken')||null
  constructor(
    private _baivietService: BaivietService,
    private _sanphamService: ProductService,
    private _dangkyService: DangkyService,
    private _cartService: GiohangService,
    private route: ActivatedRoute,
    private _tagService: TagsService,
    private _LocalStorageService: LocalStorageService,
    private spinnerService: NgxSpinnerService
  ) {
    this.APITINYMCE = environment.APITINYMCE;
  }
  AddCart(item: any) {
    this._cartService.addToCart(item)
  }
  getTags(item: any) {
    item.checked = true
    this._tagService.getTagsFilter(item).subscribe()
  }
  ngOnInit(): void {
    this.spinnerService.show();
    this.confighomepage = {
      autoplay: false,
      pagination:{ clickable: true }
    };
    this.configdanhgia = {
      autoplay: false,
      loop:true,
      navigation: true,
      pagination:{ clickable: true },
      slidesPerView: 3,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },

        982: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      freeMode: true,
    };
  
    this.config = {
      infinite: true,
      loop:true,
      autoplay:true,
      navigation: true,
      pagination: true,
      slidesPerView: 2,
      slidesToScroll: 4,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        982: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
      freeMode: false,
    };
    //bai viet
    this._baivietService.getBaiviets().subscribe();
    this._baivietService.baiviets$.subscribe((res) => {
      if (res) {
        this.data = res.filter((x) => x.Loaibaiviet === 2);
        this.spinnerService.hide();  
      }
    });

    //san pham
    this._sanphamService.getProduct().subscribe();
    this._sanphamService.products$.subscribe((res) => {
      if (res) {
        this.Sanphams = res
        res.sort((a: any, b: any) => {
          return a.Ordering - b.Ordering;
        });
        this.hotProduct = res.filter(x => x.Noibat[0] == "0" || x.Noibat[1] == "0");
        this.bestSeller = res.filter(x => x.Noibat[0] == "1" || x.Noibat[1] == "1");
      }
    });
    //danh muc
    this._tagService.getTags().subscribe();
    this._tagService.tags$.subscribe((res) => {
      if (res) {
        this.items = res.filter(x => x.Loaitag == 0 && x.Trangthai == 0);
        this.items.sort((a: any, b: any) => {
          return a.Ordering - b.Ordering;
        });
        const x = this.items.length / 2;
        for (let i = 0; i < x; i++) {
          this.itemsMobile.push(this.items.slice(2 * i, 2 * i + 2));
        }
      }
    });
    // if (this.token != null) {
    //   this._dangkyService.signInUsingToken(this.token).subscribe(res => {
    //     if (res) {
    //       this._dangkyService.user$.subscribe((data) => {
    //         if (data) {
    //           if (data.Wishlist != null) {
    //             this.wishlists = data
    //           }
    //         }
    //       })

    //     }
    //   })
    // }
  }
  ngOnDestroy() {
    this._LocalStorageService.removeItem('paginate');
  }
  GetImage(data: any){
    if (data && data.Hinhanh && data.Hinhanh.hinhchinh && data.Hinhanh.hinhchinh.spath) {
      return GetImage(data.Hinhanh.hinhchinh.spath);
    } else {
      return "assets/images/logo.svg";
    }
  }
  GetTags(data: any, value: any) {
    let result: any[] = [];
    const a = value.forEach((v: any) => {
      const b = data.find((v1: any) => v1.SKU == v)
      if (b) { result.push(b) }
      }
    );
    return result
  }
}
