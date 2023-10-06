import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {AfterViewInit, Component, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatDrawerMode } from '@angular/material/sidenav';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { map, Observable } from 'rxjs';
import { ListCauhinh } from './cauhinh';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from '../../shared/localstorage.service';

 @Component({
  selector: 'taza-base-cauhinh',
  templateUrl: './cauhinh.component.html',
  styleUrls: ['./cauhinh.component.scss'],
})
export class CauhinhComponent implements AfterViewInit {
  displayedColumns: string[] = ['capbac', 'doanhthu', 'hhcanhan', 'hhgioithieu'];
  dataSource!: MatTableDataSource<any>;
  ListCauhinh:any[];
  Cauhinh:any={};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  drawerMode: MatDrawerMode = 'side';
  Opened: boolean = true;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _LocalStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: object
    ) {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
      this.drawerMode = result.matches ? 'over' : 'side';
      this.Opened = result.matches ? false : true;
    });    
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
