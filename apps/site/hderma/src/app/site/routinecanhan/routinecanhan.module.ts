import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutinecanhanComponent } from './routinecanhan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
// import { DiachiComponent } from '../../shared/diachi/diachi.component';
import { DiachiModule } from '../../shared/common/diachi/diachi.module';
import { Quiz1Component } from './quiz1/quiz1.component';
import { Quiz2Component } from './quiz2/quiz2.component';
import { Quiz3Component } from './quiz3/quiz3.component';
import { ThongtinComponent } from './thongtin/thongtin.component';
import { KetquaComponent } from './ketqua/ketqua.component';
import { SwiperModule } from 'swiper/angular';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DiachiModule,
    SwiperModule,
    RouterModule.forChild([
      // { path: 'step1', component: Step1Component },
      // { path: 'step2', component: Step2Component },
      // { path: 'step3', component: Step3Component },
      {path: '', redirectTo: 'thongtin', pathMatch: 'full' },
      // {path:'thongtin',component:ThongtinComponent},
      // {path:'diachi',component:DiachiComponent},
      // {path:'step1',component:Quiz1Component},
      // {path:'step2',component:Quiz2Component},
      // {path:'step3',component:Quiz3Component},
      { 
        path: '', component: RoutinecanhanComponent,
        children:[
          {path:'thongtin',component:ThongtinComponent},
          // {path:'diachi',component:DiachiComponent},
          {path:'step1',component:Quiz1Component},
          {path:'step2',component:Quiz2Component},
          {path:'step3',component:Quiz3Component},
          {path:'ketqua',component:KetquaComponent},
        ],

     }
    ])
  ],
  declarations: [
    RoutinecanhanComponent,
    ThongtinComponent,
    Quiz1Component,
    Quiz2Component,
    Quiz3Component,
    KetquaComponent
  ]
})
export class RoutinecanhanModule { }
