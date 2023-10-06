import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CauhinhchungComponent } from './cauhinhchung.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';
import { CauhinhChitietComponent } from './cauhinh-chitiet/cauhinh-chitiet.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    RouterModule.forChild([
      {
        path: '', component: CauhinhchungComponent,
        children: [{ path: ':slug', component: CauhinhChitietComponent }]
      }
    ])
  ],
  declarations: [CauhinhchungComponent,CauhinhChitietComponent]
})
export class CauhinhchungModule { }
