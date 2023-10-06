import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { DonhangService } from '../../../admin/donhang/donhang.service';
import { GetImage } from '../../../shared/shared.utils';

@Component({
  selector: 'taza-base-camon',
  templateUrl: './camon.component.html',
  styleUrls: ['./camon.component.scss'],
})
export class CamonComponent implements OnInit {
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private _DonhangService: DonhangService,
    @Inject(PLATFORM_ID) private platformId: object,
    ) {}
  Detail:any;
  state$?: Observable<any>;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any) => {
      this._DonhangService.getDonhangbyMDH(params.vnp_TxnRef).subscribe(data=>
        {
          this.Detail = data;
          console.log(data)}
          )
    });
  if (isPlatformBrowser(this.platformId)) {
    this.state$ = this.route.paramMap
    .pipe(map(() => window.history.state.data))  
    }
    else
    {
      this.state$ = this.route.paramMap
      .pipe(map(() => window.history.state.data))  
    }
  
 
  }
  GetImage(data: any) {
    return GetImage(data);
  }
  Total(items:any)
  {    
    return items.reduce((acc:any, item:any) => acc + item.Soluong * item.Dongia, 0)
  }
}
