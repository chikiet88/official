import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MaterialModule } from '../../../shared/material.module';
import { TinhtrangdaChitietComponent } from '../tinhtrangda/tinhtrangda-chitiet/tinhtrangda-chitiet.component';
import { TinhtrangdaComponent } from '../tinhtrangda/tinhtrangda.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    RouterModule.forChild([
      {
        path: '', component: TinhtrangdaComponent,
        children: [{
          path: ':id', component: TinhtrangdaChitietComponent
        }]
    
      }
    ])
  ],
  declarations: [TinhtrangdaComponent,TinhtrangdaChitietComponent]
})
export class TinhtrangdaModule { }
