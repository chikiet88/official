import { Component, OnInit } from '@angular/core';
import { KetquaService } from '../../../../shared/ketqua.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '../../../../shared/localstorage.service';
import { UsersService } from '../../../../shared/users.service';
import { CombosanphamService } from '../../../../shared/combosanpham.service';
@Component({
  selector: 'app-lichsuroutine-detail',
  templateUrl: './lichsuroutine-detail.component.html',
  styleUrls: ['./lichsuroutine-detail.component.css']
})
export class LichsuroutineDetailComponent implements OnInit {
  Detail:any={}
  token: any = this._LocalStorageService.getItem('TazagroupToken') || null
  config!:any
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _KetquaService: KetquaService,
    private spinnerService: NgxSpinnerService ,
    private _LocalStorageService: LocalStorageService,
    private _UsersService: UsersService,
    private _CombosanphamService: CombosanphamService,
  ) {
    this.spinnerService.show();
   }

  ngOnInit(): void {
    this.config = {
      infinite: true,
      loop:false,
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
    window.scrollTo({ top: 0, behavior: 'smooth' });  
    if(this.token)
    {
    this._UsersService.getProfile().subscribe()
    this._UsersService.profile$.subscribe((user: any) => {
      if (user) {     
        // console.log(user);   
        this._route.params.subscribe((paramsId) => {
          const id = paramsId['id'];
          if (id) {
            this._KetquaService.getByid(id).subscribe();
            this._KetquaService.ketqua$.subscribe((res:any) => {
              if (res) {
                this.Detail = res;
                this._CombosanphamService.getByid(res.idCombo).subscribe((combo)=>
                {
                  this.Detail.Combo = combo
                })
               // console.log(res); 
                this.spinnerService.hide();
              }    
            });
          }
        });
      }
    })
    }
    else
    {
      console.log("ádasdads");
      
      this.spinnerService.hide();
    }
  }

}

