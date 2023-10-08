import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MaterialModule } from '../../../shared/material.module';
import { CombosanphamChitietComponent } from './combosanpham-chitiet/combosanpham-chitiet.component';
import { CombosanphamComponent } from './combosanpham.component';
import { CombosanphamDieukienComponent } from './combosanpham-chitiet/combosanpham-dieukien/combosanpham-dieukien.component';
import { HinhanhModule } from '../../../shared/common/hinhanh/hinhanh.module';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    HinhanhModule,
    RouterModule.forChild([
      {
        path: '', component: CombosanphamComponent,
        children: [{
          path: ':id', component: CombosanphamChitietComponent
        }]
    
      }
    ])
  ],
  declarations: [CombosanphamComponent,CombosanphamChitietComponent,CombosanphamDieukienComponent]
})
export class CombosanphamModule { }
