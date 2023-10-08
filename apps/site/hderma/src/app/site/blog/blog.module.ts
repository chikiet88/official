import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BlogchitietComponent } from './blogchitiet/blogchitiet.component';
import { BloglistComponent } from './bloglist/bloglist.component';
// import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SwiperModule } from 'swiper/angular';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    MaterialModule,
    // PaginationModule.forRoot(),
    RouterModule.forChild([
      { path: '', component: BloglistComponent },
      { path: ':slug', component: BlogchitietComponent },
    ])
  ],
  declarations: [BlogComponent,BloglistComponent,BlogchitietComponent]
})
export class BlogModule { }
