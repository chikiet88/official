import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhanloaidaService } from '../../../shared/phanloaida.service';
import { NotifierService } from 'angular-notifier';
import { KetquaService } from '../../../shared/ketqua.service';
import { LocalStorageService } from '../../../shared/localstorage.service';
import { UsersService } from '../../../shared/users.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lichsuroutine',
  templateUrl: './lichsuroutine.component.html',
  styleUrls: ['./lichsuroutine.component.css']
})
export class LichsuroutineComponent implements OnInit {
  Ketquas:any[]=[]
  Combo:any={}
  CUser:any={}
  token: any = this._LocalStorageService.getItem('hderma_token') || null
  constructor(
    private _router: Router,
    private _LocalStorageService: LocalStorageService,
    private _KetquaService: KetquaService,
    private _UsersService: UsersService,
    private spinnerService: NgxSpinnerService
  ) { 
    this.spinnerService.show();
  }
  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });  
   if(this.token)
   {
    this._UsersService.getProfile().subscribe()
    this._UsersService.profile$.subscribe((data: any) => {
      if (data) {        
        this.CUser = data
        this._KetquaService.getBySDT(data.SDT).subscribe((ketqua)=>{
          if(ketqua)
          {
            this.Ketquas = ketqua
            this.spinnerService.hide();
          }
        })
      }
      else
      {
        if(this._LocalStorageService.getItem('Routine_Khachhang'))
        {
          this.CUser = this._LocalStorageService.getItem('Routine_Khachhang').Khachhang     
          this._KetquaService.getBySDT(this.CUser.SDT).subscribe((ketqua)=>{
            if(ketqua)
            {
            this.Ketquas = ketqua
           //  this.spinnerService.hide();
            }
            else {this.spinnerService.show();}
          })              
        }
        else
        {
        //  this.spinnerService.hide();
          this.CUser = { Hoten: '', SDT: '' }
        }   
      }
    })
  } 
  else
  {
    this.spinnerService.hide();
  }
}

  NextStep()
  {
    // this.Ketqua.Trangthai = 1
    // this._KetquaService.updateKetqua(this.Ketqua).subscribe((data)=>
    // {
    //   this._LocalStorageService.removeItem('Routine_Khachhang') 
    //   this._router.navigate(['/'])
    // })
  }
  Backstep()
  {
    
    this._router.navigate(['/routine-canhan/step3'])
  }

}
