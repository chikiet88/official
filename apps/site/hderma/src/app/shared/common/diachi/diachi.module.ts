import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiachiComponent } from './diachi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [DiachiComponent],
  exports:[DiachiComponent]
})
export class DiachiModule { }
