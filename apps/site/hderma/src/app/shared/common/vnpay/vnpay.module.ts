import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VnpayComponent } from './vnpay.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VnpayComponent],
  exports:[VnpayComponent]
})
export class VnpayModule { }
