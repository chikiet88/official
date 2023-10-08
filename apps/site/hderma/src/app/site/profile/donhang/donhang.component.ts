import { Component, OnInit, ViewChild } from '@angular/core';
import { DonhangService } from '../../../admin/donhang/donhang.service';
import { UsersService } from '../../../shared/users.service';
import { TTDonhang } from '../../../shared/shared-datatype';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'taza-base-donhang',
  templateUrl: './donhang.component.html',
  styleUrls: ['./donhang.component.scss'],
})
export class DonhangComponent implements OnInit {
  Donhangs:any[]=[];
  filterDonhangs:any[]=[];
  TTDonhang =TTDonhang
  displayedColumns: string[] = ['MaDH', 'Ngaytao', 'Trangthai', 'Tongcong'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _donhangService:DonhangService,
    private _usersService:UsersService
    ) {
      this._usersService.getProfile().subscribe();
      this._usersService.profile$.subscribe((data:any)=>
      {
        if(data!=null)
        {
        this._donhangService.getDonhangByidKH(data.id).subscribe();
        this._donhangService.donhang$.subscribe((res: any) => {
          if (res) {
             this.filterDonhangs = this.Donhangs = res;
             this.dataSource = new MatTableDataSource(res);
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
          }
        });
      }})

  }

  ngOnInit(): void {}
  SumTotal(item:any)
  {
    return item.reduce((acc:any, curr:any) => acc + (curr.Soluong*curr.Product.Gia), 0)
  }
  Findbyid(item:any,items:any)
  {
    const result =  items.find((v:any)=>v.id ==item)
    return result?result.Tieude:''
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterDonhangs = this.Donhangs.filter((v)=>{
      return v.MaDonHang.toLowerCase().includes(filterValue)
    })    
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}
