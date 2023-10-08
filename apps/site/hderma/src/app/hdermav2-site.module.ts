import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, UrlMatchResult, UrlSegment } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule } from 'angular-notifier';
import { AccountNotificationsComponent } from './admin/account-notifications/account-notifications.component';
import { TimkiemComponent } from './site/timkiem/timkiem.component';
import { TracuudonComponent } from './site/tracuudon/tracuudon.component';
import { UsersInterceptor } from './shared/users.interceptor';
import { AuthModule } from './admin/auth/auth.module';
import { AuthService } from './admin/auth/auth.service';
import { AdminGuard } from './admin/auth/guards/admin.guard';
import { GuestGuard } from './admin/auth/guards/guest.guard';
import { MaterialModule } from './shared/material.module';
import { SendercodeComponent } from './admin/dangky/sendercode/sendercode.component';
import { DangkyComponent } from './admin/dangky/dangky.component';
import { DangnhapComponent } from './admin/dangnhap/dangnhap.component';
import { AuthGuard } from './admin/auth/guards/auth.guard';
@NgModule({
  imports: [
    CommonModule,
    NotifierModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12,
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10,
        },
      },
      theme: 'material',
      behaviour: {
        autoHide: 5000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4,
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease',
        },
        hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50,
        },
        shift: {
          speed: 300,
          easing: 'ease',
        },
        overlap: 150,
      },
    }),
    MaterialModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    NoopAnimationsModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('./site/portfolio/portfolio.module').then((m) => m.PortfolioModule),
      },
      {
        path: 'site',
        loadChildren: () =>
          import('./site/main/main.module').then((m) => m.MainModule),
      },
      {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./admin/main/main.module').then((m) => m.MainModule),
      },
      {
        path: 'dangnhap',
        canActivate: [GuestGuard],
        canActivateChild: [GuestGuard],
        component: DangnhapComponent,
      },
      {
        path: 'dangky',
        canActivate: [GuestGuard],
        canActivateChild: [GuestGuard],
        component: DangkyComponent,
      },
      {
        path: 'sendercode',
        canActivate: [GuestGuard],
        canActivateChild: [GuestGuard],
        component: SendercodeComponent,
      },
    ]),
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: UsersInterceptor, multi: true },
  ],
  declarations: [
    LoginAdminComponent,
    DangnhapComponent,
    AccountNotificationsComponent,
    TimkiemComponent,
    SendercodeComponent,
    TracuudonComponent,
  ],
})
export class Hdermav2SiteModule { }
