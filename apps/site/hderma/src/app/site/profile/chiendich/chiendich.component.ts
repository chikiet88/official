import { Component, OnInit, ViewChild } from '@angular/core';
import { ChiendichService } from '../../../admin/cauhinh/chiendich/chiendich.service';
import { CustomerchiendichService } from './chiendich.service';
import { MatAccordion } from '@angular/material/expansion';
import { DonhangService } from '../../../admin/donhang/donhang.service';
import { UsersService } from '../../../shared/users.service';

@Component({
  selector: 'taza-base-chiendich',
  templateUrl: './chiendich.component.html',
  styleUrls: ['./chiendich.component.scss'],
})
export class ChiendichComponent implements OnInit {
  user: any
  chiendichs: any[] = []
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  constructor(
    private _CustomerchiendichService: CustomerchiendichService,
    private _chiendichService: ChiendichService,
    private _usersService: UsersService,
    private _DonhangService: DonhangService,
  ) { }
  ngOnInit(): void {
    this._chiendichService.getAll().subscribe();
    this._chiendichService.chiendichs$.subscribe((data: any) => {
      if (data) {
        this.chiendichs = data
      }
    })
    this._usersService.getProfile().subscribe();
    this._usersService.profile$.subscribe(user => {
      if (user) {
        this.user = user;
        this._DonhangService.getDonhangByidKH(this.user.id).subscribe()
      }
      }
    )

  }
  AddCustomChiendich(data: any) {
    const dulieu = { idUser: this.user.id, idCD: data.id }
    this._CustomerchiendichService.createCustomerchiendich(dulieu).subscribe()
  }
}
