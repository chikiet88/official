import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {
  listPage:any[] = []
  itemsPerPage = 12;
  currentPage:number = 1;
  totalItems = 1;
  totalPages = 0;
  constructor() { }

  ngOnInit() {
  }
  pageChanged(page:number): void {
    // this.getListpage(page)
    // this._router.navigate([], {queryParams: {page: page},queryParamsHandling: 'merge'})
  }

}
