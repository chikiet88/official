import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MaterialModule } from '../../../shared/material.module';
import { NhomroutineChitietComponent } from '../nhomroutine/nhomroutine-chitiet/nhomroutine-chitiet.component';
import { NhomroutineComponent } from '../nhomroutine/nhomroutine.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    RouterModule.forChild([
      {
        path: '', component: NhomroutineComponent,
        children: [{
          path: ':id', component: NhomroutineChitietComponent
        }]
    
      }
    ])
  ],
  declarations: [NhomroutineComponent,NhomroutineChitietComponent]
})
export class NhomroutineModule { }
