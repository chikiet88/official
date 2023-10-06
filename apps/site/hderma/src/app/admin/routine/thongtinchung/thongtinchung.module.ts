import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MaterialModule } from '../../../shared/material.module';
import { ThongtinchungChitietComponent } from './thongtinchung-chitiet/thongtinchung-chitiet.component';
import { ThongtinchungComponent } from './thongtinchung.component';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    RouterModule.forChild([
      {
        path: '', component: ThongtinchungComponent,
        children: [{
          path: ':id', component: ThongtinchungChitietComponent
        }]
    
      }
    ])
  ],
  declarations: [
    ThongtinchungComponent,
    ThongtinchungChitietComponent
  ]
})
export class ThongtinchungModule { }
