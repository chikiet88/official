import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { CustomersService } from '../../../shared/customers.service';
// import { DiachiComponent } from '../../../shared/diachi/diachi.component';
import { LocalStorageService } from '../../../shared/localstorage.service';
import { UsersService } from '../../../shared/users.service';
import { Router } from '@angular/router';
import { KetquaService } from '../../../shared/ketqua.service';
import { GenId } from '../../../shared/shared.utils';
import { DiaChiInit } from '../../../shared/diachi';
import { Steps } from '../../../shared/initvalue.types';

@Component({
  selector: 'app-thongtin',
  templateUrl: './thongtin.component.html',
  styleUrls: ['./thongtin.component.css']
})
export class ThongtinComponent implements OnInit {
  ChosenTinh: any = {}
  ChosenQuan: any = {}
  ChosenPhuong: any = {}
  ChosenDiachi: any
  filterTinh: any[] = []
  Tinh: any[] = []
  filterQuan: any[] = []
  Quan: any[] = []
  filterPhuong: any[] = []
  Phuong: any[] = []
  token: any = this._LocalStorageService.getItem('TazagroupToken') || null
  CUser: any = { Hoten: '', SDT: '' }
  Diachi: any[] = []
  Diachis: any[] = []
  Ketqua: any = { Thongtin: [], Tinhtrangda: [], Phanloaida: [] }
  isEdit: boolean = false
  phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  constructor(
    private _UsersService: UsersService,
    private _dialog: MatDialog,
    private _NotifierService: NotifierService,
    private _CustomersService: CustomersService,
    private _KetquaService: KetquaService,
    private _LocalStorageService: LocalStorageService,
    private _router: Router,
  ) { }

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (this.token) {
      this._UsersService.getProfile().subscribe()
      this._UsersService.profile$.subscribe((data: any) => {
        if (data) {
          this.CUser = data
        }
        else {
          if (this._LocalStorageService.getItem('Routine_Khachhang')) {
            this.CUser = this._LocalStorageService.getItem('Routine_Khachhang').Khachhang
          }
          else {
            this.CUser = { Hoten: '', SDT: '' }
          }

        }
      })
    }
  }
  OpenDelete(item: any, teamplate: TemplateRef<any>) {
    const dialogRef = this._dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 'true') {
        this.CUser.Diachi = this.CUser.Diachi.filter((v: any) => v.id !== item.id)
      }
    });
  }
  GetDiachi(value: any) {
    this.Diachis = value
    this.isEdit = false;
  }
  // OpenDiachi()
  // {
  //   const dialogRef = this._dialog.open(DiachiComponent,{
  //   });
  //   dialogRef.afterClosed().subscribe((result:any) => {
  //   });
  // }
  Begin() {
    if (this.CUser.Hoten == '') {
      this._NotifierService.notify("error", "Vui lòng nhập họ tên")
    }
    else if (!this.phoneRegex.test(this.CUser.SDT)) {
      this._NotifierService.notify('error', `Số Điện Thoại Không Hợp Lệ`);
    }
    // else if (!this.CUser.email) {
    //   this._NotifierService.notify('error', `Vui lòng nhập Email`);
    // }
    // else if(!this.emailPattern.test(this.CUser.email))
    // {
    //   this._NotifierService.notify('error', `Sai định dạng email`);
    // }
    else {
      if (this.CUser.id) {
        this._CustomersService.getByidUser(this.CUser.id).subscribe((khachhang) => {
          if (khachhang) {
            this._KetquaService.getByidKH(khachhang.id).subscribe((ketqua) => {
              if (ketqua) {
                console.log(ketqua);
                const Step = Steps.find(v => v.step == ketqua.Step)
                console.log(Step);
                this._router.navigate([Step?.url])
                this._LocalStorageService.setItem('Routine_Khachhang', ketqua)
              }
              else {
                const item = {
                  idKH: khachhang.id,
                  SDT: this.CUser.SDT,
                  Khachhang:
                  {
                    Hoten: this.CUser.Hoten,
                    Gioitinh: this.CUser.Gioitinh,
                    email: this.CUser.email,
                    SDT: this.CUser.SDT,
                  },
                  Ketqua: {},
                  Mota: { Phanloai: [], Tinhtrang: [], TitleCombo: '', MotaCombo: '' },
                  Step: 1
                }
                this._KetquaService.createKetqua(item).subscribe((data) => {
                  this._LocalStorageService.setItem('Routine_Khachhang', data)
                  this._router.navigate(['/routine-canhan/step1'])
                })
              }
            })
          }
          else {
            this._CustomersService.createCustomer(this.CUser).subscribe((data) => {
              const item = {
                idKH: data.id,
                Step: 1
              }
              this._KetquaService.createKetqua(item).subscribe((data) => {
                this._LocalStorageService.setItem('Routine_Khachhang', data)
                this._router.navigate(['/routine-canhan/step1'])
              })
            })
          }
        })
      }
      else {
        const item = {
          idKH: '',
          SDT: this.CUser.SDT,
          Khachhang:
          {
            Hoten: this.CUser.Hoten,
            Gioitinh: this.CUser.Gioitinh,
            email: this.CUser.email,
            SDT: this.CUser.SDT,
          },
          Ketqua: {},
          Mota: { Phanloai: [], Tinhtrang: [], TitleCombo: '', MotaCombo: '' },
          Step: 1
        }
        this._KetquaService.createKetqua(item).subscribe((data) => {
          this._LocalStorageService.setItem('Routine_Khachhang', data)
          this._router.navigate(['/routine-canhan/step1'])
        })
      }
    }
  }

  displayFn(data: any): string {
    return data && data.name ? data.name : '';
  }
}
