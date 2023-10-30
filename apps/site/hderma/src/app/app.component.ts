import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NotifierService } from 'angular-notifier';
declare var Notification: any;
@Component({
  selector: 'taza-base-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Phạm Chí Kiệt - Fullstack Developer';
  @HostListener('window:scroll', ['$event']) onWindowScroll(e:any) {
    // console.log(e.target['scrollingElement'].scrollTop)
  }
  constructor(
  private swUpdate: SwUpdate,
  private _notifierService: NotifierService,
  @Inject(PLATFORM_ID) private platformId: object,
  @Inject(DOCUMENT) private document: any
    ) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((data) => {    
        console.log(data);
        
        if (confirm('Có Phiên Bản Mới. Bạn Có Muốn Cập Nhật Không')) {
            if (isPlatformBrowser(this.platformId)) {
              window.location.reload();
              }
              else
              {
                window.location.reload();
              }
            
        }
      });
    }
  }
  ngOnInit(): void {
   // console.log(this._notifierService.notify('success','Cập nhật thành công'));
  }
}
