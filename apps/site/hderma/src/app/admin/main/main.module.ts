import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SwiperModule } from 'swiper/angular';
import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HinhanhComponent } from '../hinhanh/hinhanh.component';
import { PageComponent } from '../page/page.component';
import { KhachhangComponent } from '../khachhang/khachhang.component';
import { KhachhangDetailComponent } from '../khachhang/khachhang-detail/khachhang-detail.component';
import { MaterialModule } from '../../shared/material.module';
import { AdminGuard } from '../auth/guards/admin.guard';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    HttpClientModule,
    EditorModule,
    RouterModule.forChild([
      {
        path: '',
        component:MainComponent,
        children: [
          {
            path: 'demo',
            loadChildren: () =>
              import('../demo/demo.module').then((m) => m.DemosModule),
            // canActivate: [CauhoiGuard],
          },
          {
            path: 'routine',
            // canActivate: [AdminGuard],
            loadChildren: () =>
              import('../routine/routine.module').then((m) => m.RoutineModule),
          },
          {
            path: 'dashboard',
            canActivate: [AdminGuard],
            component: DashboardComponent
          },
          {
            path: 'hinhanh',
            canActivate: [AdminGuard],
            component: HinhanhComponent
          },
          {
            path: 'baiviet',
            canActivate: [AdminGuard],
            loadChildren: () =>
              import('../baiviet/baiviet.module').then((m) => m.BaivietModule),
            // canActivate: [CauhoiGuard],
          },
          {
            path: 'seotool',
            canActivate: [AdminGuard],
            loadChildren: () =>
              import('../seotool/seotool.module').then((m) => m.SeotoolModule),
            // canActivate: [CauhoiGuard],
          },
          {
            path: 'danhmuc',
            canActivate: [AdminGuard],
            loadChildren: () =>
              import('../danhmuc/danhmuc.module').then((m) => m.DanhmucModule),
          },
          {
            path: 'san-pham',
            canActivate: [AdminGuard],
            loadChildren: () =>
              import('../product/product.module').then((m) => m.ProductModule),
          },
          {
            path: 'sanpham',
            canActivate: [AdminGuard],
            loadChildren: () =>
              import('../sanpham/sanpham.module').then((m) => m.SanphamModule),
          },
          {
            path: 'danh-muc-san-pham',
            canActivate: [AdminGuard],
            loadChildren: () =>
              import('../danhmuc-product/danhmuc-product.module').then(
                (m) => m.DanhmucProductModule
              ),
          },
          {
            path: 'tags',
            canActivate: [AdminGuard],
            loadChildren: () =>
              import('../tags/tags.module').then((m) => m.TagsModule),
          },
          {
            path: 'donhang',
            canActivate: [AdminGuard],
            loadChildren: () =>
              import('../donhang/donhang.module').then((m) => m.DonhangModule),
          },
          {
            path: 'comment',
            canActivate: [AdminGuard],
            loadChildren: () =>
              import('../comment/comment.module').then((m) => m.CommentModule),
          },
          {
            path: 'cauhinh',
            canActivate: [AdminGuard],
            loadChildren: () =>
              import('../cauhinh/cauhinh.module').then((m) => m.CauhinhModule),
          },
          {
            path: 'khachhang',
            canActivate: [AdminGuard],
            component:KhachhangComponent,
            children:[
              {path:':id',component:KhachhangDetailComponent}
            ]
          },
          {
            path: 'page',
            canActivate: [AdminGuard],
            component:PageComponent
          },
        ],
      },
    ]),
  ],
  providers: [],
  exports: [RouterModule],
  declarations: 
  [
  MainComponent,
  DashboardComponent,
  HinhanhComponent,
  KhachhangComponent,
  KhachhangDetailComponent
  ],
})
export class MainModule {}
