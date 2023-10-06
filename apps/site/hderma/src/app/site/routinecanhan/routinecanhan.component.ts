import { Component, OnInit, TemplateRef } from '@angular/core';
import { UsersService } from '../../shared/users.service';
import { MatDialog } from '@angular/material/dialog';
// import { DiachiComponent } from '../../shared/diachi/diachi.component';
import { NotifierService } from 'angular-notifier';
import { CustomersService } from '../../shared/customers.service';
import { LocalStorageService } from '../../shared/localstorage.service';

@Component({
  selector: 'app-routinecanhan',
  templateUrl: './routinecanhan.component.html',
  styleUrls: ['./routinecanhan.component.css']
})
export class RoutinecanhanComponent implements OnInit {
  token: any = this._LocalStorageService.getItem('TazagroupToken') || null
  CUser: any = { Hoten: '', SDT: '' }
  Diachi: any[] = []
  Diachis: any[] = []
  isEdit:boolean =false
  isEditable:boolean =false
  phoneRegex =/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  constructor(
    private _UsersService: UsersService,
    private _dialog: MatDialog,
    private _NotifierService: NotifierService,
    private _CustomersService: CustomersService,
    private _LocalStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    if(this.token)
    {
    this._UsersService.getProfile().subscribe()
    this._UsersService.profile$.subscribe((data: any) => {
      if (data) {
        this.CUser = data
        this.Diachis = this.CUser.Diachi
        if(this.Diachis){this.isEdit =false}
      }
    })
   }
  }
  OpenDelete(item:any,teamplate:TemplateRef<any>)
  {
    const dialogRef = this._dialog.open(teamplate,{
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result=='true')
      {
      this.CUser.Diachi = this.CUser.Diachi.filter((v:any)=>v.id!==item.id)
      }
    });
  }
  GetDiachi(value:any)
  {   
    this.Diachis = value  
    this.isEdit =false;
  }
  // OpenDiachi()
  // {
  //   const dialogRef = this._dialog.open(DiachiComponent,{
  //   });
  //   dialogRef.afterClosed().subscribe((result:any) => {
  //   });
  // }
  Begin()
  {
    this.CUser.Diachi = this.Diachis;
    if(this.CUser.Hoten=='')
    {
      this._NotifierService.notify("error","Vui lòng nhập họ tên")
    }
    else if(!this.phoneRegex.test(this.CUser.SDT))
    {
      this._NotifierService.notify('error', `Số Điện Thoại Không Hợp Lệ`);
    }
    else if(this.Diachis.length==0)
    {
      this._NotifierService.notify('error', `Vui Lòng Nhập Địa Chỉ`);
    }
    else
    {
      this._CustomersService.createCustomer(this.CUser).subscribe()
    }
  }


}
