import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { NotifierService } from 'angular-notifier';
import { ThongtinchungService } from '../../../shared/thongtinchung.service';
import { GenId, GetImage } from '../../../shared/shared.utils';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { UploadService } from '../../../shared/upload.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CombosanphamService } from '../../../shared/combosanpham.service';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { SanphamService } from '../../../shared/sanpham.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-combosanpham',
  templateUrl: './combosanpham.component.html',
  styleUrls: ['./combosanpham.component.css']
})
export class CombosanphamComponent implements OnInit {
  Detail: any = {};
  Lists: any[] = []
  Sanphams: any[] = []
  FilterLists: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  APITINYMCE= environment.APITINYMCE;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  displayedColumns: string[] = ['No','Title','Mota','Thongtin','Phanloai','Tinhtrang','Sanpham','Combo'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isLoading:boolean =false
  constructor(
    private dialog: MatDialog,
    private _Notification: NotifierService,
    private _CombosanphamService: CombosanphamService,
    private _SanphamService: SanphamService,
    private _UploadService: UploadService,
    private spinnerService: NgxSpinnerService
  ) {}
  configTiny: EditorComponent['init'] = {
    // selector: '.dfree-header',
    content_style: '.mce-content-body { border: 1px dashed blue; padding: 10px;  } '+'.mce-content-body p {margin-top: 0;margin-bottom: 0;}',
    menubar: false,
    inline: false,
    toolbar: 'undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
    plugins: [
       'quickbars','advlist','autolink','lists','link','image','charmap','preview','anchor',
      'searchreplace','visualblocks','code','fullscreen',
      'insertdatetime','media','table','code','help'
       ],
    // quickbars_insert_toolbar: 'undo redo',
    // quickbars_selection_toolbar: 'undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
    branding: false,
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  GetDapan(data:any)
  {
    const item = data.find((v:any)=>v.correct == true)
    return item
  }
  ngOnInit(): void {
    this._SanphamService.getProducts().subscribe();
    this._SanphamService.products$.subscribe(data=>{
      this.Sanphams = data      
    })
    this._CombosanphamService.getAll().subscribe()
    this._CombosanphamService.combosanphams$.subscribe((data)=>{  
      if(data)
      {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.FilterLists = this.Lists = data
        this.spinnerService.hide();
      }
      else {
        this.spinnerService.show();
      }      

    })
  }
  CreateDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result=='true') {
        this._CombosanphamService.createCombosanpham(this.Detail).subscribe(()=>
        {
          this.Detail={}
          this._Notification.notify('success','Thêm mới thành công')
        })
      }
    });
  }
  RemoveItem(data:any,teamplate: TemplateRef<any>)
  {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result=='true') {
        this._CombosanphamService.deleteCombosanpham(data).subscribe(()=>this._Notification.notify('success','Xoá thành công'))
      }
    });
   
  }
  GetCorrect(data:any)
  {
    return data.find((v:any)=>v.correct==true)
  }
  AddDapan(item:any)
  {
    const data = this.FilterLists.find(v=>v.id==item.id)
    const field = {id:GenId(5,false),value:'',Hinhanh:'',correct:false}
    data.Dapan.push(field)
    this.FilterLists[this.FilterLists.indexOf(data)] = data;
  }
  UpdateItem(item:any)
  {
    this._CombosanphamService.updateCombosanpham(item).subscribe(()=>this._Notification.notify('success','Thêm mới thành công'))
  }
  CheckCorrect(item1:any,item:any)
  {
    item.Dapan.forEach((v:any) => {
      if(v.id == item1.id)
      {
        v.correct = true
      }
      else
      {
        v.correct = false
      }
    });
    this.FilterLists[this.FilterLists.indexOf(item)] = item;
  }
  GetImage(data: any) {
    return 'https://images.tazagroup.vn/'+data
  }
}

