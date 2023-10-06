import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DanhmucProductService } from '../../admin/danhmuc-product/danhmuc-product.service';
import { TagsService } from '../../admin/tags/tags.service';
import { SanphamService } from '../../shared/sanpham.service';
import { GetImage } from '../../shared/shared.utils';
import { NotifierService } from 'angular-notifier';
import { GiohangService } from '../../shared/giohang.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../shared/localstorage.service';
@Component({
  selector: 'taza-base-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.scss'],
})
export class SanphamComponent implements OnInit {
  panelOpenState = false;
  showFiller = false;
  isMobile = false;
  typeMatDra!: string;
  tags: any = [];
  tempCheckbox: any = []
  arrcheckbox: any = []
  Sanphams: any[] = []
  FilterSanphams: any[] = []
  Sortby:any={}
  Sortbys:any[]=[
    {id:1,Title:'Mới Nhất',value:1},
    {id:2,Title:'Bán Chạy Nhất',value:2},
    {id:3,Title:'Giá Thấp - Cao',value:3},
    {id:4,Title:'Giá Cao - Thấp',value:4},
  ]
  itemCart:any={soluong:0};
  TagsTinhtrang: any[] = []
  FilterTinhtrang: any[] = []
  TagsLoai: any[] = []
  FilterLoai: any[] = []
  listPage:any[] = []
  itemsPerPage = 12;
  currentPage:number = 1;
  totalItems = 1;
  totalPages = 0;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _danhmucService: DanhmucProductService,
    private _sanphamService: SanphamService,
    private _tagService: TagsService,
    private _cartService: GiohangService,
    private _NotifierService: NotifierService,
    private _LocalStorageService: LocalStorageService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }
  danhmucs: any = [];
  drawerMode:any
  Opened:any
  checkboxTags(item: any) {
    item.checked = !item.checked
    this._tagService
      .getTagsFilter(item)
      .subscribe();

  }
  getListpage(curentpage:number)
  {
    if(curentpage>3)
    {
      this.listPage=[curentpage-1,curentpage,curentpage+1]
    }
    else
    {
      this.listPage=[curentpage,curentpage+1,curentpage+2]
    }
  }
  LoadSanpham(page:any,itemsPerPage:any)
  {
    this.currentPage = Number(page)
    this._sanphamService.getPaginaProducts(page,itemsPerPage).subscribe(data=>
      {
        if(data[0].length>0)
        {
        this.totalItems = data[1]
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage)
        this.pageChanged(Number(page))
        // this.listPage = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.FilterSanphams = data[0].sort((a:any, b:any) => b.Ngaytao - a.Ngaytao);
        this._router.navigate([], {queryParams: {page: page},queryParamsHandling: 'merge'})
        }
        else
        {
          this.currentPage = 1
          this._router.navigate([], {queryParams: {page: 1},queryParamsHandling: 'merge'})
        }
      }     
     )
  }
  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      if(params['page']==undefined||params['page']==0)
      {
        this._router.navigate([], {queryParams: { page: 1},
          queryParamsHandling: 'merge',
        })
      }
    this.LoadSanpham(params['page']||1,this.itemsPerPage);
    });
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.drawerMode = result.matches ? 'over' : 'side';
      this.Opened = result.matches ? false : true;
    });
    this.Sortby = this.Sortbys.find(v=>v.value==1)
    // this.breakpointObserver
    //   .observe(['(max-width: 1024px)'])
    //   .subscribe((result: BreakpointState) => {
    //     if (result.matches) {
    //       this.isMobile = true;
    //     } else {
    //       this.isMobile = false;
    //     }
    //   });

      this._sanphamService.getProducts().subscribe((data) => {
        if (data) {
          this.Sanphams = data.filter((v:any)=>v.Trangthai==0)
          this.Sanphams.forEach(v => {
            v.Giamgia = ((v.Gia - v.GiaSale)/v.Gia).toFixed(2)
          });
          // this.PagiSanphams = this.Sanphams.slice(0, this.itemsPerPage)
          // this.totalItems = data.length
        }
      })

    this._danhmucService.getDanhmucs().subscribe();
    this._danhmucService.danhmucs$.subscribe((res) => {
      if (res) {
        this.danhmucs = res.filter(x => x.Products.length > 0);
      }
    });
    this._tagService.getTags().subscribe((data) => {
      if (data) {
        data.forEach((v: any) => { v.checked = false });
        this.TagsTinhtrang = data.filter((v: any) => v.Loaitag == 0)
        this.TagsLoai = data.filter((v: any) => v.Loaitag == 1)
      }
    })
  }
  checkTags(item:any)
  {
    item.checked =!item.checked
    this.TagsTinhtrang[this.TagsTinhtrang.indexOf(item)] = item
    const allTagsFalse = this.TagsTinhtrang.every(tag => tag.checked === false);
    console.log(allTagsFalse);
    if(allTagsFalse)
    {
      this.Reset()
    }
    else
    {
      this.FilterSanphams = this.Sanphams.filter(v =>
        v.Tags.some((tag:any) => tag.id === item.id)
      );
    }

  }
  Reset()
  {
    this.TagsTinhtrang = this.TagsTinhtrang.map(item => ({ ...item, checked: false }));
    this.TagsLoai = this.TagsLoai.map(item => ({ ...item, checked: false }));
    this._route.queryParams.subscribe(params => {
    this.LoadSanpham(params['page']||1,this.itemsPerPage);
    });
  }
  addtocart(data:any)
  {
    this.itemCart.id = data?.id,
    this.itemCart.soluong = 1,
    this.itemCart.Gia = data?.Gia,
    this.itemCart.GiaSale = data?.GiaSale,
    this.itemCart.Hinhanh = data?.Hinhanh?.hinhchinh?.spath,
    this.itemCart.Tieude = data?.Tieude,
    this.itemCart.Slug = data?.Slug,
    this._cartService.addToCart(this.itemCart);
    this._NotifierService.notify('success',`Đã Thêm ${data.SKU} vào giỏ hàng`)
  }

  GetImage(data: any){
      return GetImage(data?.Hinhanh?.hinhthongtin?.spath);
  }
  pageChanged(page:number): void {
    this.getListpage(page)
    this._router.navigate([], {queryParams: {page: page},queryParamsHandling: 'merge'})
  }
}
