import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LichsuroutineComponent } from './lichsuroutine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MaterialModule } from '../../../shared/material.module';
import { LichsuroutineDetailComponent } from './lichsuroutine-detail/lichsuroutine-detail.component';
import { SwiperModule } from 'swiper/angular';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: LichsuroutineComponent,
        children: [{
          path: ':id', component: LichsuroutineDetailComponent
        }]
      }
    ])
  ],
  declarations: [LichsuroutineComponent,LichsuroutineDetailComponent]
})
export class LichsuroutineModule { }
