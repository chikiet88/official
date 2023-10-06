import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { NotifierService } from 'angular-notifier';
import { CauhinhchungService } from '../../../shared/cauhinhchung.service';
import { BaivietService } from '../../../shared/baiviet.service';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { GetImage } from '../../../shared/shared.utils';
@Component({
  selector: 'app-cauhinhchung',
  templateUrl: './cauhinhchung.component.html',
  styleUrls: ['./cauhinhchung.component.css']
})
export class CauhinhchungComponent implements OnInit {
  Lists:any[] = []
  FilterLists:any[] = []
  Detail:any={}
  APITINYMCE = environment.APITINYMCE;
  configTiny: EditorComponent['init'] = {
    menubar: false,
    toolbar_mode: 'sliding',
    branding: false,
    image_advtab: true,
    autoresize_bottom_margin: 20,
    autoresize_min_height: 50,
    height: "200",
    deprecation_warnings: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
      'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'code', 'help'
    ],
    toolbar: 'undo redo |fontfamily fontsize blocks |forecolor backcolor | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
    default_link_target: '_blank',
    block_unsupported_drop: true,
    entity_encoding: 'raw',
    images_upload_handler: (blobInfo: any) => {
      const file = blobInfo.blob();
      const promise = new Promise<string>((resolve, reject) => {
        this._BaivietService.uploadDriver(file).subscribe((res) => {
          if (res) {
            resolve(GetImage(res.spath));
          }
        });
      });
      return promise;
    },
  };
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private dialog: MatDialog,
    private _Notification: NotifierService,
    private _CauhinhchungService: CauhinhchungService,
    private _BaivietService: BaivietService,
  ) {}
  //{ "host": "smtp.ethereal.email", "port": "587", "secure": "false", "auth": { "user": "testAccount.user", "pass": "testAccount.pass" } }
  ngOnInit(): void {
    this._CauhinhchungService.getAll().subscribe((data)=>{
      this.FilterLists = this.Lists = data
    })
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 2) {
      this.FilterLists = this.Lists.filter((v) => {
        return  v.Tieude.toLowerCase().includes(value)
       }
      )
    }
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {

    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._CauhinhchungService.createCauhinhchung(this.Detail).subscribe();
      }
    });
  }
}




