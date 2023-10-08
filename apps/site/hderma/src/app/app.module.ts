import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SoonComponent } from './soon/soon.component';
import { GioithieuComponent } from './gioithieu/gioithieu.component';
import { DoiquaComponent } from './doiqua/doiqua.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { MaterialModule } from './shared/material.module';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { Hdermav2SiteModule } from './hdermav2-site.module';
import { MyErrorHandler } from './app-error-handler';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    DashboardComponent,
    SoonComponent,
    GioithieuComponent,
    DoiquaComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.FirebaseInit),
    AngularFireMessagingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    GoogleChartsModule,
    MaterialModule,
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
    RouterModule.forRoot([],{
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      initialNavigation: 'enabledBlocking',
      relativeLinkResolution: 'legacy'
    }),
  BrowserAnimationsModule,
  FormsModule,
  NgxSpinnerModule,
  ReactiveFormsModule,
  HttpClientModule,
  Hdermav2SiteModule,
  ServiceWorkerModule.register('ngsw-worker.js', {
    enabled: false,
    registrationStrategy: 'registerWhenStable:30000',
  })
  ],
  providers: [
    // {provide: ErrorHandler, useClass: MyErrorHandler},
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
