import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { NotifierService } from 'angular-notifier';
import { ThongtinchungService } from '../../../shared/thongtinchung.service';
import { GenId } from '../../../shared/shared.utils';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { UploadService } from '../../../shared/upload.service';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-thongtinchung',
  templateUrl: './thongtinchung.component.html',
  styleUrls: ['./thongtinchung.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ThongtinchungComponent implements OnInit {
  Detail: any = {};
  Lists: any[] = []
  FilterLists: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  APITINYMCE= environment.APITINYMCE;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  displayedColumns: string[] = ['Col1','Col2', 'Col3', 'Col4'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private _Notification: NotifierService,
    private _ThongtinchungService: ThongtinchungService,
    private _UploadService: UploadService,
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
    return data.find((v:any)=>v.correct == true)
  }
  ngOnInit(): void {
    this._ThongtinchungService.getAll().subscribe()
    this._ThongtinchungService.thongtinchungs$.subscribe((data)=>{
      console.log(data);
      
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.FilterLists = this.Lists = data
    })
  }
  // applyFilter(event: Event) {
  //   const value = (event.target as HTMLInputElement).value;
  //   if (value.length > 2) {
  //     this.Lists = this.Lists.filter((v) => {
  //    return  v.Hoten.toLowerCase().includes(value)||v.SDT.toLowerCase().includes(value)
  //      }
  //     )
  //   }
  // }
  CreateDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result=='true') {
        this._ThongtinchungService.createThongtinchung(this.Detail).subscribe((data)=>
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
        this._ThongtinchungService.deleteThongtinchung(data).subscribe(()=>this._Notification.notify('success','Xoá thành công'))
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
    const field = {id:GenId(5,false),value:'',Hinhanh:'',correct:false}
    data.Dapan.push(field)
    this.FilterLists[this.FilterLists.indexOf(data)] = data;
  }
  UpdateItem(item:any)
  {
    this._ThongtinchungService.updateThongtinchung(item).subscribe((data)=>this._Notification.notify('success','Thêm mới thành công'))
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
  
  readExcelFile(event: any) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const data = new Uint8Array((e.target as any).result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        console.log(jsonData);
        jsonData.forEach((v:any,k:any) => {
          setTimeout(() => {
            // const convertedDate = v.Ngay.replace(/_/g, "/")
            // v.Ngayformat = new Date(convertedDate)
            // this.AddChart(v)
            // console.log(v);
          }, 100*k);
        });
        console.log(jsonData);
      };
      fileReader.readAsArrayBuffer(file);
    }
  
    writeExcelFile() {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
        {id:'TeXqj8Q2', Ngay: '02_06_2023',Buy: '1111', Sell: '11111' },
        {id:'TeXqj8Q3', Ngay: '02_06_2023',Buy: '1111', Sell: '11111' },
      ]);
      const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'data');
    }
    saveAsExcelFile(buffer: any, fileName: string) {
      const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
      const url: string = window.URL.createObjectURL(data);
      const link: HTMLAnchorElement = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();
    }
}

