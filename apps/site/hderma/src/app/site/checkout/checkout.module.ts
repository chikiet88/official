import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SwiperModule } from 'swiper/angular';
import { CheckoutComponent } from './checkout.component';
import { AccountNotificationsService } from '../../admin/account-notifications/account-notifications.service';
import { CamonComponent } from './camon/camon.component';
// import { DiachiComponent } from '../../shared/diachi/diachi.component';
import { DiachiModule } from '../../shared/common/diachi/diachi.module';
import { VnpayModule } from '../../shared/common/vnpay/vnpay.module';
import { GiaohangtietkiemModule } from '../../shared/common/giaohangtietkiem/giaohangtietkiem.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    SwiperModule,
    EditorModule,
    DiachiModule,
    VnpayModule,
    GiaohangtietkiemModule,
    RouterModule.forChild([
      {
        path: '',
        component: CheckoutComponent,
        // children: [{path:'diachi',component:DiachiComponent}],
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [AccountNotificationsService],
  declarations: [CheckoutComponent, CamonComponent],
})
export class CheckoutModule {}
