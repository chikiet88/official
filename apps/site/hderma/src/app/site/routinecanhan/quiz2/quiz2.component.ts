import { Component, OnInit } from '@angular/core';
import { ThongtinchungService } from '../../../shared/thongtinchung.service';
import { Router } from '@angular/router';
import { PhanloaidaService } from '../../../shared/phanloaida.service';
import { NotifierService } from 'angular-notifier';
import { KetquaService } from '../../../shared/ketqua.service';
import { LocalStorageService } from '../../../shared/localstorage.service';
import { groupBy, groupByfield } from '../../../shared/shared.utils';
import { Steps } from '../../../shared/initvalue.types';


@Component({
  selector: 'app-quiz2',
  templateUrl: './quiz2.component.html',
  styleUrls: ['./quiz2.component.css']
})
export class Quiz2Component implements OnInit {
  Quiz2:any
  Ketqua: any = this._LocalStorageService.getItem('Routine_Khachhang')||null
  constructor(
    private _PhanloaidaService:PhanloaidaService,
    private _router: Router,
    private _NotifierService: NotifierService,
    private _LocalStorageService: LocalStorageService,
    private _KetquaService: KetquaService,
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
    this._PhanloaidaService.getAll().subscribe()
    this._PhanloaidaService.phanloaidas$.subscribe((data)=>{      
      if(data)
      {    
       if(this.Ketqua.Phanloaida.length>0)
       {
        this.Quiz2 = groupByfield(this.Ketqua.Phanloaida)
       }
       else {
        this.Ketqua.Phanloaida = data   
        this.Quiz2 = groupByfield(data)
       }
      }
    })
  }
  ChonTraloi(item:any,item1:any)
  {    
    const index = this.Ketqua.Phanloaida.findIndex((v:any) => v.id === item.id);
    if (index !== -1) {
      let temp = this.Ketqua.Phanloaida[index].Dapan  
      temp.forEach((v:any) => {
        v.Traloi=""
      });    
      const index1 = temp.findIndex((v1:any) => v1.id === item1.id);
      if (index1 !== -1) {
        this.Ketqua.Phanloaida[index].Dapan[index1].Traloi = true;
      }
    }
  }
  Backstep()
  {
   this.Ketqua.Step = this.Ketqua.Step - 1
    this._KetquaService.updateKetqua(this.Ketqua).subscribe((data)=>
    {     
      const Step:any = Steps.find(v=>v.step == data.Step)
      window.location.href = Step.url
    })
  }
  NextStep()
  {
    const checkTraloi = this.Ketqua.Phanloaida.every((item:any) =>
    item.Dapan.some((item1:any) => item1.Traloi !== "")
    );
    // const checkTraloi = this.Ketqua.Phanloaida.every((item:any) => item.Traloi !== "");
    if(!checkTraloi)
    {
     this._NotifierService.notify("error","Vui lòng chọn đáp án")
    }
    else
    {
      const Phanloaida = groupByfield(this.Ketqua.Phanloaida)
      const updatedData = Phanloaida.map((item:any) => ({
        ...item,
        DiemSum: item.children.reduce((totalDiem:any, child:any) => {
          return (
            totalDiem +
            child.Dapan
              .filter((d:any) => d.Traloi === true) // Filter Dapan with Traloi = true
              .reduce((childTotalDiem:any, d:any) => childTotalDiem + d.Diem, 0)
          );
        }, 0),
      }));
      this.Ketqua.Mota.Phanloai = [];
      updatedData.forEach((v,k) => {
        this.Ketqua.Ketqua['idPhanloai_'+k]= v.Nhom.id
        v.Nhom.Dieukien.forEach((v1:any) => {
          if (v.DiemSum >= v1.Diem.Tu && v.DiemSum <= v1.Diem.Den) {
            this.Ketqua.Ketqua['idDapanPhanloai_'+k] = v1.id  
            //this.Ketqua.Mota.Phanloai.find((v2:any)=>v2.id==v1)
            this.Ketqua.Mota.Phanloai.push(v1)
          }
        });
      });
      this.Ketqua.Step = this.Ketqua.Step +1
      this._KetquaService.updateKetqua(this.Ketqua).subscribe(()=>
      {
      this._LocalStorageService.setItem('Routine_Khachhang',this.Ketqua) 
      this._router.navigate(['/routine-canhan/step3'])
      })
    }     
  }
  

}
