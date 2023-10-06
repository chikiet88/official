import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CauhinhchungService } from '../../shared/cauhinhchung.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit {
  data:any={Content:'<span>dfgdfgdfgdfgfdg</span>'};
  Lists:any[]=[]
  constructor(
    private _CauhinhchungService:CauhinhchungService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this._CauhinhchungService.getAll().subscribe((data)=>{
     // this.data = data.find(v=>v.Slug=='footer-top')
    })
  }
  TrustHtml(data:any)
  {
    return this.sanitizer.bypassSecurityTrustHtml(data)
  }

}
