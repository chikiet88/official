import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CauhinhchungService } from '../../../../shared/cauhinhchung.service';
import { CauhinhchungComponent } from '../cauhinhchung.component';
import { UsersService } from '../../../../shared/users.service';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { GetImage } from '../../../../shared/shared.utils';
import { BaivietService } from '../../../../shared/baiviet.service';
@Component({
  selector: 'app-cauhinh-chitiet',
  templateUrl: './cauhinh-chitiet.component.html',
  styleUrls: ['./cauhinh-chitiet.component.css']
})
export class CauhinhChitietComponent implements OnInit {
  user: any
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
  constructor(
    private route: ActivatedRoute,
    private _userservice: UsersService,
    private _NotifierService: NotifierService,
    private _CauhinhchungService: CauhinhchungService,
    private _CauhinhchungComponent: CauhinhchungComponent,
    private _BaivietService: BaivietService,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((paramsId) => {
      const slug = paramsId['slug'];
      if(slug){this._CauhinhchungComponent.drawer.open()}
      this._CauhinhchungService.getAll().subscribe((data:any)=>
      { 
        this.Detail = data.find((v:any)=>v.Slug==slug)
      })
      // this._CauhinhchungService.getByid(id).subscribe((data)=>
      // {
      //   this.Detail = data
      //   console.log(JSON.parse(data.Content));
        
      // }) 
    });
  }
  Update(data:any)
  {   
    this._CauhinhchungService.updateCauhinhchung(data).subscribe((data)=>
    {
      this._NotifierService.notify("success","Cập Nhật Thành Công")
    });
  }

}





