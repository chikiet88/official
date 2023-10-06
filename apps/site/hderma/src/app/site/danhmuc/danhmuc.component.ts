import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BaivietService } from '../../shared/baiviet.service';
import { GetImage, nest } from '../../shared/shared.utils';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-danhmuc',
  templateUrl: './danhmuc.component.html',
  styleUrls: ['./danhmuc.component.scss']
})
export class DanhmucComponent implements OnInit {
  constructor(
    private _BaivietService: BaivietService,
    private _route: ActivatedRoute,
    private _router: Router,
    private meta: Meta,
    private breakpointObserver: BreakpointObserver,
    private spinnerService: NgxSpinnerService
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.drawerMode = result.matches ? 'over' : 'side';
      this.Opened = result.matches ? false : true;
    });
  }
  Baiviets: any[] = []
  Danhmucs: any
  drawerMode: any
  Opened: any
  itemsPerPage = 5;
  currentPage: number = 1;
  totalItems = 1;
  totalPages = 0;
  listPage: any[] = []
  PagiBaiviets: any[] = [];
  Danhmuc: any
  @Inject(PLATFORM_ID) private platformId!: object
  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });    
     this.spinnerService.show();
    this.getListpage(this.currentPage);
    this._route.url.subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        const currentUrl = window.location.href;
        const Base = currentUrl.split('?')[0];
        this.setCanonicalLink(Base);
        console.log(Base);
      }
      else {
        const currentUrl = window.location.href;
        const Base = currentUrl.split('?')[0];
        this.setCanonicalLink(Base);
        console.log(Base);
      }

    });
    this._route.params.subscribe((paramsId) => {
      this._BaivietService.getBaiviets().subscribe((baiviets:any)=>
      {
        this._BaivietService.getDanhmucDetail(paramsId['slug']).subscribe((data: any) => {
          if(data)
          {
            this.Danhmuc = data;
            this.PagiBaiviets = baiviets.filter((v:any)=>v.pid==data.id)
            this.spinnerService.hide();
          }
        })
      })
    })
    this._route.queryParams.subscribe(params => {
      if (params['page'] == undefined || params['page'] == 0) {
        this._router.navigate([], {
          queryParams: { page: 1 },
          queryParamsHandling: 'merge',
        })
      }
      this.LoadBaiviet(params['page'] || 1, this.itemsPerPage);
    });
    this._BaivietService.getDanhmucs().subscribe((data) => {
      this.Danhmucs = data.filter((v:any)=>v.id!='b5552de3-155c-4708-8e37-f0350cbc3a80');
      this.Danhmucs = nest(this.Danhmucs)
    })
  }
  setCanonicalLink(url: string) {
    this.meta.removeTag('rel=canonical');
    this.meta.addTag({ rel: 'canonical', href: url });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length > 2) {
      this._BaivietService.searchBaiviet(filterValue).subscribe((data)=>
      { 
        this.PagiBaiviets = data
        })
    }
    else {
      this._route.queryParams.subscribe(params => {
        if (params['page'] == undefined || params['page'] == 0) {
          this._router.navigate([], {
            queryParams: { page: 1 },
            queryParamsHandling: 'merge',
          })
        }
        this.LoadBaiviet(params['page'] || 1, this.itemsPerPage);
      });
    }
    this.totalItems = this.PagiBaiviets.length
  }
  Soluong(data: any, begin: any, end: any) {
    return data.slice(begin, end)
  }
  getListpage(curentpage: number) {
    if (curentpage > 3) {
      this.listPage = [curentpage - 2, curentpage - 1, curentpage, curentpage + 1, curentpage + 2]
    }
    else {
      this.listPage = [curentpage, curentpage + 1, curentpage + 2, curentpage + 3, curentpage + 4]
    }
  }
  LoadBaiviet(page: any, itemsPerPage: any) {
    this.currentPage = Number(page)
    this._BaivietService.getPaginaBaiviets(page, itemsPerPage).subscribe(data => {
      if (data[0].length > 0) {
        this.totalItems = data[1]
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage)
        this.pageChanged(Number(page))
        this.PagiBaiviets = data[0].sort((a: any, b: any) => b.Ngaytao - a.Ngaytao);
        this.PagiBaiviets = this.PagiBaiviets.filter((v: any) => v.pid != 'b5552de3-155c-4708-8e37-f0350cbc3a80');
        this._router.navigate([], { queryParams: { page: page }, queryParamsHandling: 'merge' })
      }
      else {
        this.currentPage = 1
        this._router.navigate([], { queryParams: { page: 1 }, queryParamsHandling: 'merge' })
      }
    }
    )
  }
  pageChanged(page: number): void {
    this.getListpage(page)
    this._router.navigate([], { queryParams: { page: page }, queryParamsHandling: 'merge' })
  }
  GetImage(data: any) {
    return GetImage(data)
  }
}
