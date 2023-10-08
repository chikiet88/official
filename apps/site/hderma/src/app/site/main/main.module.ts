import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SwiperModule } from 'swiper/angular';
import { MainComponent } from './main.component';
import { TrangchuComponent } from '../trangchu/trangchu.component';
import { VehdermaComponent } from '../vehderma/vehderma.component';
import { SanphamComponent } from '../sanpham/sanpham.component';
import { LienheComponent } from '../lienhe/lienhe.component';
import { CartComponent } from '../cart/cart.component';
import { ContactComponent } from '../../admin/contact/contact.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AccountNotificationsComponent } from '../../admin/account-notifications/account-notifications.component';
import { AccountNotificationsService } from '../../admin/account-notifications/account-notifications.service';
import { SeeallComponent } from './notifications/seeall/seeall.component';
import { TimkiemComponent } from '../timkiem/timkiem.component';
import { CamonComponent } from '../checkout/camon/camon.component';
import { TracuudonComponent } from '../tracuudon/tracuudon.component';
import { AuthService } from '../../admin/auth/auth.service';
import { AuthGuard } from '../../admin/auth/guards/auth.guard';
import { GuestGuard } from '../../admin/auth/guards/guest.guard';
import { MaterialModule } from '../../shared/material.module';
import { UsersInterceptor } from '../../shared/users.interceptor';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SwiperslideComponent } from '../trangchu/swiperslide/swiperslide.component';
import { RouterModule } from '@angular/router';
import { DanhmucComponent } from '../danhmuc/danhmuc.component';
import { DangkyComponent } from '../../admin/dangky/dangky.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SwiperModule,
    HttpClientModule,
    EditorModule,
    FormsModule,
    RouterModule.forChild([
      {  
        path: '',
        component: MainComponent,
        children: [
          {
            path: '',
            component: TrangchuComponent,
          },
          {
            path: 'trang-chu',
            component: TrangchuComponent,
          },
          {
            path: 've-chung-toi',
            component: VehdermaComponent,
          },
          { path: 'san-pham', loadChildren: () => import('../sanpham/sanpham.module').then(m => m.SanphamModule) },
          {path: 'bai-viet',loadChildren: () =>import('../blog/blog.module').then((m) => m.BlogModule)},
          {path: 'blog/:slug', component: DanhmucComponent},
          {path: 'routine-canhan',loadChildren: () =>import('../routinecanhan/routinecanhan.module').then((m) => m.RoutinecanhanModule)},
          {path: 'lichsu-routine',loadChildren: () =>import('../routinecanhan/lichsuroutine/lichsuroutine.module').then((m) => m.LichsuroutineModule)},
          {
            path: 'lien-he',
            component: LienheComponent,
          },
          {
            path: 'cart',
            component: CartComponent,
          },
          {
            path: 'tim-kiem',
            component: TimkiemComponent,
          },
          {
            path: 'tra-cuu-don',
            component: TracuudonComponent,
          },
          {
            path: 'notifications',
            canActivate: [AuthGuard],
            component: AccountNotificationsComponent,
          },
          {
            path: 'checkout',
            // canActivate: [GuestGuard],
            loadChildren: () =>
              import('../checkout/checkout.module').then(
                (m) => m.CheckoutModule
              ),
            // canActivate: [CauhoiGuard],
          },
          {
            path: 'camon',
            component: CamonComponent,
          },
          {
            path: 'profile',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../profile/profile.module').then((m) => m.ProfileModule),
          },
          // {
          //   path: 'wishlist',
          //   canActivate: [GuestGuard],
          //   loadChildren: () =>
          //     import('../wishlist/wishlist.module').then(
          //       (m) => m.WishlistModule
          //     ),
          // },
        ],
      },
    ]),
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: UsersInterceptor, multi: true },
    AccountNotificationsService,
  ],
  exports: [RouterModule],
  declarations: [
    TrangchuComponent,
    VehdermaComponent,
    MainComponent,
    LienheComponent,
    CartComponent,
    DangkyComponent,
    ContactComponent,
    UserMenuComponent,
    NotificationsComponent,
    SeeallComponent,
    HeaderComponent,
    FooterComponent,
    SwiperslideComponent,
    DanhmucComponent
  ],
})
export class MainModule {}
