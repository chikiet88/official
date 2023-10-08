import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhanloaidaComponent } from './phanloaida.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PhanloaidaChitietComponent } from './phanloaida-chitiet/phanloaida-chitiet.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    RouterModule.forChild([
      {
        path: '', component: PhanloaidaComponent,
        children: [{
          path: ':id', component: PhanloaidaChitietComponent
        }]

      }
    ])
  ],
  declarations: [PhanloaidaComponent,PhanloaidaChitietComponent]
})
export class PhanloaidaModule { }
