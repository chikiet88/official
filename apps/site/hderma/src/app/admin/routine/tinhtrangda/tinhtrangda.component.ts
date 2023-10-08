import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { NotifierService } from 'angular-notifier';
import { ThongtinchungService } from '../../../shared/thongtinchung.service';
import { GenId } from '../../../shared/shared.utils';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { UploadService } from '../../../shared/upload.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TinhtrangdaService } from '../../../shared/tinhtrangda.service';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-tinhtrangda',
  templateUrl: './tinhtrangda.component.html',
  styleUrls: ['./tinhtrangda.component.css']
})
export class TinhtrangdaComponent implements OnInit {
  Detail: any = {};
  Lists: any[] = []
  FilterLists: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  APITINYMCE= environment.APITINYMCE;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  displayedColumns: string[] = ['Col1','Nhom','Col2','Dapan', 'Col4'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private _Notification: NotifierService,
    private _TinhtrangdaService: TinhtrangdaService,
    private _UploadService: UploadService,
    private spinnerService: NgxSpinnerService
  ) {}

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
    this._TinhtrangdaService.getAll().subscribe()
    this._TinhtrangdaService.tinhtrangdas$.subscribe((data)=>{   
      if(data)
      {         
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.FilterLists = this.Lists = data
       this.spinnerService.hide();
      }
      else { this.spinnerService.show();}
    })
  }
  CreateDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result=='true') {
        this._TinhtrangdaService.createTinhtrangda(this.Detail).subscribe(()=>
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
        this._TinhtrangdaService.deleteTinhtrangda(data).subscribe(()=>this._Notification.notify('success','Xoá thành công'))
      }
    });
   
  }
  GetUpload(value:any,index:any)
  {   
   // this.Detail.Dapan[index].Hinhanh = value  
  }
  GetCorrect(data:any)
  {
    return data.find((v:any)=>v.correct==true)
  }
  AddDapan(item:any)
  {
    const data = this.FilterLists.find(v=>v.id==item.id)
    const field = {id:GenId(5,false),value:'',Hinhanh:'',Mota:'',correct:false}
    data.Dapan.push(field)
    this.FilterLists[this.FilterLists.indexOf(data)] = data;
  }
  UpdateItem(item:any)
  {
    this._TinhtrangdaService.updateTinhtrangda(item).subscribe(()=>this._Notification.notify('success','Thêm mới thành công'))
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
}

