import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Lightbox } from 'ngx-lightbox';
import { TagsService } from '../../../admin/tags/tags.service';
import { SanphamService } from '../../../shared/sanpham.service';
import { SeotoolService } from '../../../shared/seotools.service';
import { GetImage } from '../../../shared/shared.utils';
import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';
import { GiohangService } from '../../../shared/giohang.service';
@Component({
  selector: 'app-sanpham-chitiet',
  templateUrl: './sanpham-chitiet.component.html',
  styleUrls: ['./sanpham-chitiet.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class SanphamChitietComponent implements OnInit {
  Sanpham:any={
    Title:'',
    Hinhanh:{
      ContentImage:{spath:''},
      Image:{spath:''},  
      hinh1:{spath:''},  
      hinh2:{spath:''},  
      hinh3:{spath:''},  
      hinh4:{spath:''},  
    }}
  Giamgia:any
  Hinhanhs:any[]=[]
  SPTuongtu:any
  tagsFilter:any 
  Reviews:any[]=[
    {
      
    }
  ] 
  configproduct:any;
  config:any;
  configthumbs:SwiperOptions={}
  itemCart:any={soluong:0};
  indexNumber = 1;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  constructor(
    private _SanphamService:SanphamService,
    private _ActivatedRoute:ActivatedRoute,
    private _tagService:TagsService,
    private _notifierService:NotifierService,
    private _router: Router,
    private _lightbox: Lightbox,
    private _cartService: GiohangService,
    private _SeotoolService: SeotoolService,
    ) {}
    goToSlide(slideIndex: number) {
      this.indexNumber =slideIndex
      if (this.swiper) {
        this.swiper.swiperRef.slideTo(slideIndex)
      }
    }
    updateCart(item: any, soluong: number) {
      const itemCart:any={};
      itemCart.id = item?.id,
      itemCart.Gia = item?.Gia,
      itemCart.GiaSale = item?.GiaSale,
      itemCart.Hinhanh = item?.Hinhanh?.hinhchinh?.spath,
      itemCart.Tieude = item?.Tieude,
      itemCart.Slug = item?.Slug
      if (soluong > 0) {
        this._cartService.updateQuantity(itemCart, soluong)
        this._notifierService.notify("success","Thêm Thành Công")
      }
    }
    onKeyDown(event: KeyboardEvent): void {
      const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace'];
      if (!allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    }
  ngOnInit() {
    this._ActivatedRoute.url.subscribe(urlSegments => {
      const path = urlSegments.join('/');
    });
    
    this._ActivatedRoute.params.subscribe((paramsId) => {
      this._SanphamService.getProductBySlug(paramsId['slug']).subscribe((data:any)=>{
        console.log(data);
        
        this._cartService.getCarts()
        this.Hinhanhs.push(GetImage(data?.Hinhanh?.hinh1?.spath))
        this.Hinhanhs.push(GetImage(data?.Hinhanh?.hinh2?.spath))
        this.Hinhanhs.push(GetImage(data?.Hinhanh?.hinh3?.spath))
        this.Hinhanhs.push(GetImage(data?.Hinhanh?.hinh4?.spath))
        this.Hinhanhs.push(GetImage(data?.Hinhanh?.hinh5?.spath))

        this.Sanpham = data,
        this.Sanpham.soluong = 1
        this._cartService.carts$.subscribe((res) => {
          if (res) {
           const existingItem = res.find(v=>v.id == this.Sanpham.id)
            if(existingItem)
            {
              this.Sanpham.soluong = existingItem.soluong
            }
          }
        });
        this._SeotoolService.setMetaData(
          data.TitleSeo,
          data.DesSeo,
          data.KeywordSeo,
          data.RobotsSeo,
          data.Slug,
          GetImage(data?.Hinhanh?.hinhchinh?.spath),     
          )
        this._SanphamService.getProducts().subscribe((data1)=>{
          this.SPTuongtu = data1.filter((v:any)=>{return v.Danhmuc.id == data.Danhmuc.id}).slice(0,4)
        })
      this.Giamgia = ((data.Gia - data.GiaSale)/data.Gia).toFixed(2)
      });
    })
    this.configthumbs = {
      direction:'vertical',
      loop:true,
      slidesPerView: 4,
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
      freeMode: false,
    };
    this.config = {
      infinite: true,
      slidesPerView: 1,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        982: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
      },
      thumbs:{
         swiper: this.configthumbs 
      },
      freeMode: false
    };
    this.configproduct = {
      infinite: true,
      slidesPerView: 4,
      navigator:true,
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
      thumbs:{
         swiper: this.configthumbs 
      },
      freeMode: false
    };
  
  }
    // this._SanphamService.getBaiviets().subscribe((data)=>{this.Bailienquan = data.slice(0,3)
    //   console.log(data);
    //   });
  GetImage(img:any)
    {
     return GetImage(img);
    }
  open(data:any,field:any): void {
    const img = [{src: data.Hinhanh[field].spath,caption: data.Hinhanh[field].name,thumb: data.Hinhanh[field].spath}];
      this._lightbox.open(img);
    }
  close(): void {
      this._lightbox.close();
    } 
  addtocart(data:any)
    {
      this.itemCart.id = data.id,
      this.itemCart.soluong = 1,
      this.itemCart.Gia = data.Gia,
      this.itemCart.GiaSale = data.GiaSale,
      this.itemCart.Hinhanh = data?.Hinhanh?.hinhchinh?.spath,
      this.itemCart.Tieude = data.Tieude,
      this.itemCart.Slug = data.Slug,
      this._cartService.addToCart(this.itemCart);
    } 
    
    slideConfig = {
      "slidesToShow": 4, 
      "slidesToScroll": 2,
      "dots": true,
      "autoplay": true,
      "autoplaySpeed": 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    };
    addSlide() {
    }
    removeSlide() {
    }
    
    slickInit(e:any) {
    }
    
    breakpoint(e:any) {
    }
    afterChange(e:any) {
    }
    
    beforeChange(e:any) {
    }
}
