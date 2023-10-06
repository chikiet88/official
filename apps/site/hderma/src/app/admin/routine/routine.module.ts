import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutineComponent } from './routine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { TinhtrangdaComponent } from './tinhtrangda/tinhtrangda.component';
import { PhanloaidaComponent } from './phanloaida/phanloaida.component';
import { CombosanphamComponent } from './combosanpham/combosanpham.component';
import { ThongtinchungComponent } from './thongtinchung/thongtinchung.component';
import { HinhanhModule } from '../../shared/common/hinhanh/hinhanh.module';
import { ThongtinchungChitietComponent } from './thongtinchung/thongtinchung-chitiet/thongtinchung-chitiet.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HinhanhModule,
    EditorModule,
    RouterModule.forChild([
      {
        path: '', component: RoutineComponent,
        children: [
          { path: 'thongtinchung', loadChildren: () => import('./thongtinchung/thongtinchung.module').then(m => m.ThongtinchungModule) },
          { path: 'tinhtrangda', loadChildren: () => import('./tinhtrangda/tinhtrangda.module').then(m => m.TinhtrangdaModule) },
          { path: 'combosanpham', loadChildren: () => import('./combosanpham/combosanpham.module').then(m => m.CombosanphamModule) },
          { path: 'phanloaida', loadChildren: () => import('./phanloaida/phanloaida.module').then(m => m.PhanloaidaModule) },
          { path: 'nhomroutine', loadChildren: () => import('./nhomroutine/nhomroutine.module').then(m => m.NhomroutineModule) },
        ]
      },
    ])
  ],
  declarations: [
    RoutineComponent,
  ]
})
export class RoutineModule { }
