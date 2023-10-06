import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ListCauhinh } from '../cauhinh';
import { LocalStorageService } from '../../../shared/localstorage.service';
@Component({
  selector: 'taza-base-nhiemvu',
  templateUrl: './nhiemvu.component.html',
  styleUrls: ['./nhiemvu.component.scss'],
})
export class NhiemvuComponent implements AfterViewInit {
  displayedColumns: string[] = ['capbac', 'doanhthu', 'hhcanhan', 'hhgioithieu'];
  dataSource!: MatTableDataSource<any>;
  ListCauhinh:any[];
  Cauhinh:any={};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _LocalStorageService:LocalStorageService
  ) {
    const StoreListCauhinh = _LocalStorageService.getItem('ListCauhinh')
    if(StoreListCauhinh!=null) {
      this.ListCauhinh = JSON.parse(StoreListCauhinh)
    }
    else {this.ListCauhinh = ListCauhinh}

  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.ListCauhinh);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  AddCauhinh(data: any) {
    this.ListCauhinh.push(data);
    this.Cauhinh = {}
    this._LocalStorageService.setItem('ListCauhinh',JSON.stringify(this.ListCauhinh));
    this.dataSource = new MatTableDataSource(this.ListCauhinh);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
