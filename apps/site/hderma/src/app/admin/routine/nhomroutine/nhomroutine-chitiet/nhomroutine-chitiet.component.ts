import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { UsersService } from '../../../../shared/users.service';
import { NhomroutineService } from '../../../../shared/nhomroutine.service';
import { UploadService } from '../../../../shared/upload.service';
import { GenId, GetImage } from '../../../../shared/shared.utils';
import { NhomroutineComponent } from '../nhomroutine.component';
@Component({
  selector: 'app-nhomroutine-chitiet',
  templateUrl: './nhomroutine-chitiet.component.html',
  styleUrls: ['./nhomroutine-chitiet.component.css']
})
export class NhomroutineChitietComponent implements OnInit {
  Detail: any={}
  Danhmuc:any[] =[]
  APITINYMCE= environment.APITINYMCE;
  public activeTabIndex: number | undefined = undefined;
  @ViewChild('tabGroup', { static: false }) public tabGroup: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userservice: UsersService,
    private _NotifierService: NotifierService,
    private _NhomroutineComponent: NhomroutineComponent,
    private _NhomroutineService: NhomroutineService,
    private _UploadService: UploadService,
    
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((paramsId) => {
      const id = paramsId['id'];
      if (id) {
        this._NhomroutineComponent.drawer.open();
        this._NhomroutineService.getByid(id).subscribe();
        this._NhomroutineService.nhomroutine$.subscribe((res:any) => {
          if (res) {
            console.log(res);    
            this.Detail = res;
          }
        });
      }
    });
  }
configTiny: EditorComponent['init'] = {
    //selector: '.dfree-header',
    content_style: '.mce-content-body { border: 1px dashed blue; padding: 10px;  } '+'.mce-content-body p {margin-top: 0;margin-bottom: 0;}',
    menubar: false,
    inline: false,
    themes: "modern",
    toolbar_mode:'sliding',
    toolbar: 'undo redo bold italic underline alignleft aligncenter alignright alignjustify| fullscreen preview code link image media',
    plugins: [
       'quickbars','advlist','autolink','lists','link','image','charmap','preview','anchor',
      'searchreplace','visualblocks','code','fullscreen',
      'insertdatetime','media','table','code','help'
       ],
   // quickbars_insert_toolbar: 'undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
   // quickbars_selection_toolbar: 'undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
    branding: false,
    statusbar:false,
    image_advtab: true,
    autoresize_bottom_margin: 20,
    autoresize_min_height: 50,
    height:"200",
    deprecation_warnings: false,
    default_link_target: '_blank',
    block_unsupported_drop: true,
    entity_encoding: 'raw',
        images_upload_handler: (blobInfo: any) => {
          const file = blobInfo.blob();
          const promise = new Promise<string>((resolve, reject) => {
            this._UploadService.uploadDriver(file).subscribe((res) => {
              if (res) {   
                resolve(GetImage(res.spath));
              }
            });
          });
          return promise;
        }, 
  };
  CloseDrawer()
  {
    this.router.navigate(['../'], { relativeTo: this.route });
    this._NhomroutineComponent.drawer.close();
  }
  Update(data:any)
  {
    this._NhomroutineService.updateNhomroutine(data).subscribe((res) => {
      if (res) {
        this._NhomroutineComponent.ngOnInit()
        this._NotifierService.notify("success","Cập nhật thành công")
      }
    });
  }
  public handleTabChange(e: MatTabChangeEvent) {
    this.activeTabIndex = e.index;
  }
  public ngAfterViewInit() {
   // this.activeTabIndex = this.tabGroup.selectedIndex;
  }
  CheckValue(data:any,field:any)
  {      
    const result = data[field].spath !='' && data[field].spath !== null && typeof data[field].spath === 'object'&&Object.keys(data[field]).length!==0;   
    return result
  }
  GetUpload(value:any,index:any)
  {   
    this.Detail.Dapan[index].Hinhanh = value  
  }
  AddDapan()
  {
    const field = {id:GenId(5,false),value:'',Hinhanh:'',Diem:0,correct:false}
    this.Detail.Dapan.push(field)
  }
  RemoveDapan(item:any)
  {
    this.Detail.Dapan = this.Detail.Dapan.filter((v:any)=>v.id!=item.id)
    console.log(this.Detail.Dapan);
  }
  CheckCorrect(item:any)
  {
    console.log(item);
    
    this.Detail.Dapan.forEach((v:any) => {
      console.log(v);
      if(v.id == item.id)
      {
        v.correct = true
      }
      else
      {
        v.correct = false
      }
    });
  }
}