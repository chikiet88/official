import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { AuthUtils } from './auth.utils';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { UsersService } from '../../shared/users.service';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from '../../shared/localstorage.service';
@Injectable()
export class AuthService {
  private readonly _secret: any;
  private _authenticated: boolean = false;
  private APIURL: string = environment.APIURL;
  constructor(
    private _httpClient: HttpClient,
    private _userService: UsersService,
    private _LocalStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this._secret = 'site.hderma.vn';
  }
  set accessToken(token: string) {
    this._LocalStorageService.setItem('hderma_token', token);
  }
  get accessToken(): string {
   return this._LocalStorageService.getItem('hderma_token') ?? '';
  }
  Dangnhap(user: any): Observable<any> {
    if (this._authenticated) {
      return of([false, 'User Đã Đăng Nhập']);
    }
    return this._httpClient.post(`${this.APIURL}/hderma_auth/login`, user).pipe(
      switchMap((response: any) => {
        if (response[0]) {
          this._authenticated = true;
          this.accessToken = response[1].access_token;
        }
        return of(response);
      })
    );
  }
  checkDangnhap(): Observable<boolean> {
    if (this._authenticated) {
      return of(true);
    }
    if (!this.accessToken || this.accessToken === 'undefined') {
      this._LocalStorageService.removeItem('hderma_token')
      return of(false);
    }
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }
    return of(true);
    // return this.signInUsingToken();
  }
  Dangxuat(): Observable<any> {
    this._LocalStorageService.removeItem('hderma_token')
    this._LocalStorageService.removeItem('Routine_Khachhang')
    this._authenticated = false;
    return of(true);
  }
}
