import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio-header',
  templateUrl: './portfolio-header.component.html',
  styleUrls: ['./portfolio-header.component.css']
})
export class PortfolioHeaderComponent implements OnInit {
  @HostListener('window:scroll')
  onScroll() {
    const offset = 80;
    if (window.scrollY > offset) {
      this.isSticky =true
    } else {
      this.isSticky =false 
    }
  }
  isSticky:boolean=false
  Menus: any[] = [
    { id: 1, Title: 'Trang Chủ', Slug: '/' },
    { id: 2, Title: 'về Tôi', Slug: 'san-pham' },
    { id: 2, Title: 'Dịch Vụ', Slug: 'san-pham' },
    { id: 2, Title: 'Sản Phẩm', Slug: 'san-pham' },
    { id: 2, Title: 'Nhật Ký', Slug: 'san-pham' },
    { id: 2, Title: 'Liên Hệ', Slug: 'san-pham' },
    // {
    //   id: 4, Title: 'Góc Chia Sẻ', Slug: 'bai-viet',
    //   children: [
    //     { id: 1, Title: 'Tin Tức', Slug: 'blog/tin-tucs' },
    //     { id: 2, Title: 'Từ Điển Thành Phần', Slug: 'blog/tu-dien-thanh-phan' },
    //     { id: 3, Title: 'Kiến Thức Chăm Sóc Da', Slug: 'blog/kien-thuc-cham-soc-da' },
    //   ]
    // },
    // { id: 5, Title: 'Liên Hệ', Slug: 'lien-he' },
    // {
    //   id: 6, Title: 'Routine', Slug: '/',
    //   children: [
    //     { id: 1, Title: 'Tạo Routine', Slug: 'routine-canhan' },
    //     { id: 2, Title: 'Lịch Sử Routine', Slug: 'lichsu-routine' },
    //   ]
    // },
  ]
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
  }

}
