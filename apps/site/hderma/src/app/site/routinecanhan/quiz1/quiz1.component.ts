import { Component, OnInit } from '@angular/core';
import { ThongtinchungService } from '../../../shared/thongtinchung.service';
import { Router } from '@angular/router';
import { KetquaService } from '../../../shared/ketqua.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { LocalStorageService } from '../../../shared/localstorage.service';
import { Steps } from '../../../shared/initvalue.types';

@Component({
  selector: 'app-quiz1',
  templateUrl: './quiz1.component.html',
  styleUrls: ['./quiz1.component.css']
})
export class Quiz1Component implements OnInit {
  Quiz1:any[]=[]
  Ketqua: any = this._LocalStorageService.getItem('Routine_Khachhang') || null
  constructor(
    private _dialog: MatDialog,
    private _NotifierService: NotifierService,
    private _ThongtinchungService: ThongtinchungService,
    private _LocalStorageService: LocalStorageService,
    private _KetquaService: KetquaService,
    private _router: Router
  ) { }
  ngOnInit() { 
    window.scrollTo({ top: 0, behavior: 'smooth' });   
    if(!this.Ketqua)
    {
      this._router.navigate(['/routine-canhan/thongtin'])
    }
    else
    {
      this._KetquaService.getByid(this.Ketqua.id).subscribe((data)=>
      {
        this.Ketqua = data
        const Step = Steps.find(v=>v.step == data.Step)
        this._router.navigate([Step?.url])
        console.log(Step);   
      })
    }
    this._ThongtinchungService.getAll().subscribe()
    this._ThongtinchungService.thongtinchungs$.subscribe((data:any)=>{
    if(data)
    {
          this.Quiz1 =  data
          if(this.Ketqua.Thongtin.length>0)
          {
            this.Quiz1 = this.Ketqua.Thongtin
          }
          else {
            this.Ketqua.Thongtin = data.map((item:any) => ({
              id: item.id,
              Cauhoi:item.Cauhoi,
              Dapan: item.Dapan.map((dapanItem:any) => ({
                ...dapanItem,
                Traloi: ""
              }))
            }));
          }
      }
    })
  }
  ChonTraloi(item:any,item1:any)
  {
    const index = this.Ketqua.Thongtin.findIndex((v:any) => v.id === item.id);
    if (index !== -1) {
      let temp = this.Ketqua.Thongtin[index].Dapan  
      temp.forEach((v:any) => {
        v.Traloi=""
      });    
      const index1 = temp.findIndex((v1:any) => v1.id === item1.id);
      if (index1 !== -1) {
        this.Ketqua.Thongtin[index].Dapan[index1].Traloi = true;
      }
    }
  }
  Backstep()
  {    
    this._router.navigate(['/routine-canhan/thongtin'])
  }
  NextStep()
  {      
    const checkTraloi = this.Ketqua.Thongtin.every((item:any) => 
    {
      const index1= item.Dapan.findIndex((item1:any) =>item1.Traloi !== "")
      if (index1 !== -1)
      {
       return true 
      } else {
        return false
      }   
    }
 )
   if(!checkTraloi)
   {
    this._NotifierService.notify("error","Vui lòng chọn đáp án")
   }
   else
   {
         this.Ketqua.Step = 2 
         this.Ketqua.Thongtin.forEach((v:any,k:any) => {
          this.Ketqua.Ketqua['idThongtin_'+k]= v.id
          const Dapan = v.Dapan.find((v:any)=>v.Traloi==true)
          this.Ketqua.Ketqua['idDapanThongtin_'+k] = Dapan?.id
        });
        this._KetquaService.updateKetqua(this.Ketqua).subscribe(()=>
        {
        this._LocalStorageService.setItem('Routine_Khachhang',this.Ketqua) 
        this._router.navigate(['/routine-canhan/step2'])
        })
   }
  }

}