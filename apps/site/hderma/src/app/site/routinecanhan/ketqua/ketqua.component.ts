import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhanloaidaService } from '../../../shared/phanloaida.service';
import { NotifierService } from 'angular-notifier';
import { KetquaService } from '../../../shared/ketqua.service';
import { LocalStorageService } from '../../../shared/localstorage.service';
import { CombosanphamService } from '../../../shared/combosanpham.service';
import { groupByfield } from '../../../shared/shared.utils';
import { Steps } from '../../../shared/initvalue.types';

@Component({
  selector: 'app-ketqua',
  templateUrl: './ketqua.component.html',
  styleUrls: ['./ketqua.component.css']
})
export class KetquaComponent implements OnInit {
  Combos:any[]=[]
  Combo:any={}
  config:any
  Ketqua: any = this._LocalStorageService.getItem('Routine_Khachhang') || null
  constructor(
    private _PhanloaidaService:PhanloaidaService,
    private _router: Router,
    private _NotifierService: NotifierService,
    private _LocalStorageService: LocalStorageService,
    private _CombosanphamService: CombosanphamService,
    private _KetquaService: KetquaService,
  ) { }
  ngOnInit() {
    this.config = {
      infinite: true,
      loop:false,
      autoplay:true,
      navigation: true,
      pagination: true,
      slidesPerView: 2,
      slidesToScroll: 4,
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        982: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
      freeMode: false,
    };
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
    this._CombosanphamService.getAll().subscribe()
    this._CombosanphamService.combosanphams$.subscribe((data)=>{    
      if(data)
      {
       this.Combos =  data    
       const transformedCombos = data.flatMap((combo) => {
         return combo.Dieukien.map((dieukien:any) => ({
           Dieukien: dieukien,
           id: combo.id,
           Title: combo.Title,
         }));
       });       
       transformedCombos.forEach(v => {
        v.Dieukien = Object.keys(v.Dieukien).reduce((acc:any, key:any) => {
          if (v.Dieukien[key] !== "") {
            acc[key] = v.Dieukien[key];
          }
          return acc;
        }, {});
        const comparedValues =  this.compareValues(v.Dieukien, this.Ketqua.Ketqua);   
        
        // console.log(v.Title);               
        // console.log(v.Dieukien);               
        // console.log( this.Ketqua.Ketqua);               
        // console.log(comparedValues);  
        // console.log(Object.keys(v.Dieukien).length);     
        // console.log(Object.keys(comparedValues).length);

        if(Object.keys(v.Dieukien).length===Object.keys(comparedValues).length)
        {
          this.Combo = this.Combos.find(v1=>v1.id==v.id)
          // console.log(this.Combos);
          // console.log(this.Combos.filter(v1=>v1.id==v.id));
          console.log(this.Combo);
          
          this.Ketqua.idCombo = this.Combo.id    
          this.Ketqua.Combo = this.Combo
          this.Ketqua.Mota.MotaCombo2 = this.Ketqua.Mota.Bonus==true?this.Combo.Mota2:""  
          console.log(this.Ketqua);         
        }     
      });       
      }  
    })
  }
  CheckCombo()
  {
    return Object.keys(this.Combo).length>0?true:false 
  }

  compareValues(root:any, value2:any) {
    const result:any = {};
    for (const key in root) {
      if (value2.hasOwnProperty(key) && root[key] === value2[key]) {
        result[key] = root[key];
      }
    }
    return result;
  }

  NextStep()
  {
    
    this.Ketqua.Trangthai = 1
    this._KetquaService.updateKetqua(this.Ketqua).subscribe((data)=>
    {
      this._LocalStorageService.removeItem('Routine_Khachhang') 
      this._router.navigate(['/'])
    })
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
  AddCombotoCart(item:any)
  {

  }

}
