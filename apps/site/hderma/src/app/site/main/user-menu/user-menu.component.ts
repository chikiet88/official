import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WishlistService } from '../../wishlist/wishlist.service';
import { UsersService } from '../../../shared/users.service';
import { AuthService } from '../../../admin/auth/auth.service';
import { LocalStorageService } from '../../../shared/localstorage.service';
import { GiohangService } from '../../../shared/giohang.service';


@Component({
  selector: 'taza-base-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  constructor(
    private _cartService: GiohangService,
    private _wishlistService: WishlistService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _usersService: UsersService,
    private _LocalStorageService: LocalStorageService
  ) {}
  token: any = this._LocalStorageService.getItem('hderma_token')||null;
  User: any;
  ngOnInit(): void {
    if (this.token) {
      this._usersService.getProfile().subscribe();
      this._usersService.profile$.subscribe((data) => {
        if (data) {
          this.User = data;
        }
      });
    }
  }
  Dangxuat() {
    this._authService.Dangxuat().subscribe((res) => {
      if (res == true) {
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/';
        this._router.navigate(['']);
        location.reload();
      }
    });
    this._wishlistService.deleteWishlist().subscribe();
  }
}
