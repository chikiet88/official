import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaivietService } from '../../../shared/baiviet.service';
import { SeotoolService } from '../../../shared/seotools.service';
import { GetImage } from '../../../shared/shared.utils';

@Component({
  selector: 'app-blogchitiet',
  templateUrl: './blogchitiet.component.html',
  styleUrls: ['./blogchitiet.component.scss']
})
export class BlogchitietComponent implements OnInit {
  constructor(
    private _BaivietService:BaivietService,
    private _ActivatedRoute:ActivatedRoute,
    private _SeotoolService:SeotoolService,
    ) {}
  Baiviet:any={Title:''}
  Bailienquan:any
  config:any
  GetImage(data: any) {
    return GetImage(data)
  }
  ngOnInit() {
    this.config = {
      infinite: true,
      slidesPerView: 3,
      navigator:true,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        982: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      freeMode: false
    };
    this._ActivatedRoute.params.subscribe((paramsId) => {
      this._BaivietService.getBaivietBySlug(paramsId['slug']).subscribe((data)=>{
        this.Baiviet = data
        this._SeotoolService.setMetaData(
          data.TitleSeo,
          data.DesSeo,
          data.KeywordSeo,
          data.RobotsSeo,
          data.Slug,
          GetImage(data.Hinhanh.hinhchinh.spath),     
          )      
      });
    })
    this._BaivietService.getBaiviets().subscribe((data)=>{
      this.Bailienquan = data.filter((v:any)=>v.pid!='b5552de3-155c-4708-8e37-f0350cbc3a80');
      this.Bailienquan = this.Bailienquan.slice(0,3)      
      });
  }
  Checkundefined(data:any)
  {   
    return data?false:true;
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
