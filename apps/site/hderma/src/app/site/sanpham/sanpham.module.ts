import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EditorModule } from "@tinymce/tinymce-angular";
import { SwiperModule } from "swiper/angular";
import { MaterialModule } from "../../shared/material.module";
import { SanphamComponent } from "./sanpham.component";
import { SanphamChitietComponent } from "./sanpham-chitiet/sanpham-chitiet.component";
import { LightboxModule } from "ngx-lightbox";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SwiperModule,
    HttpClientModule,
    EditorModule,
    FormsModule,
    LightboxModule,
    RouterModule.forChild([
      { path: '', component: SanphamComponent },
      { path: ':slug', component: SanphamChitietComponent }
    ])

  ],
  exports: [RouterModule],
  declarations: [
    SanphamComponent,
    SanphamChitietComponent
],
})
export class SanphamModule {}
