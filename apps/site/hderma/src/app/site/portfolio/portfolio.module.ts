import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { PortfolioHeaderComponent } from './portfolio-header/portfolio-header.component';
import { MaterialModule } from '../../shared/material.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '', component: PortfolioComponent,
        // children: [{
        //   path: ':id', component: PhanloaidaChitietComponent
        // }] 
      }
    ])
  ],
  declarations: [PortfolioComponent,PortfolioHeaderComponent]
})
export class PortfolioModule { }
