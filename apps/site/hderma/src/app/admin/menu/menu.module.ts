import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    RouterModule.forChild([
      {
        path: '', component:MenuComponent ,
        children: [{
          path: ':id', component: MenuDetailComponent
        }]
    
      }
    ])
  ],
  declarations: [MenuComponent]
})
export class MenuModule { }
