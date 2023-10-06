import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TinhtrangdaService } from '../../../shared/tinhtrangda.service';
import { NotifierService } from 'angular-notifier';
import { KetquaService } from '../../../shared/ketqua.service';
import { LocalStorageService } from '../../../shared/localstorage.service';
import { groupBy, groupByfield } from '../../../shared/shared.utils';
import { Steps } from '../../../shared/initvalue.types';
@Component({
  selector: 'app-quiz3',
  templateUrl: './quiz3.component.html',
  styleUrls: ['./quiz3.component.css']
})
export class Quiz3Component implements OnInit {
  Quiz3: any = []
  Dieukienthem: any =
    {
      Cauhoi: 'Bạn có đang sử dụng 1 trong các loại sản phẩm sau: sữa rửa mặt tạo bọt, sản phẩm có chứa rượu, cồn (Alcohol denat, Ethanol, Methyl Alcohol hoặc Methanol, Benzyl alcohol, Isopropyl alcohol), bôi thoa hoặc uống tretinoin (isotretinoin)',
      Dapan: [
        { id: 1, Title: "A. Có", Traloi: '',value:true },
        { id: 2, Title: "B. Không", Traloi: '',value:false }
      ]
    }
  Ketqua: any = this._LocalStorageService.getItem('Routine_Khachhang') || null
  constructor(
    private _TinhtrangdaService: TinhtrangdaService,
    private _router: Router,
    private _NotifierService: NotifierService,
    private _LocalStorageService: LocalStorageService,
    private _KetquaService: KetquaService,
  ) { }
  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!this.Ketqua) {
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
    this._TinhtrangdaService.getAll().subscribe()
    this._TinhtrangdaService.tinhtrangdas$.subscribe((data) => {
      if (data) {
        const Thongtin = this.Ketqua.Thongtin.find((v: any) => v.id == this.Ketqua.Ketqua.idThongtin_0);
        const idThongtin = Thongtin.Dapan.find((v: any) => v.id == this.Ketqua.Ketqua.idDapanThongtin_0)?.Nhom.id;
        data = data.filter((v: any) => v.Nhom.id == idThongtin)
        if(this.Ketqua.Tinhtrangda.length>0)
        {
          this.Quiz3 = groupByfield(this.Ketqua.Tinhtrangda)  
        }
        else {
          this.Ketqua.Tinhtrangda = data
          this.Quiz3 = groupByfield(data)          
        }
      }
    })
  }
  ChonTraloi(item: any, item1: any) {
    console.log(item,item1);
    
    const index = this.Ketqua.Tinhtrangda.findIndex((v: any) => v.id === item.id);
    if (index !== -1) {
      let temp = this.Ketqua.Tinhtrangda[index].Dapan
      temp.forEach((v: any) => {
        v.Traloi = ""
      });
      const index1 = temp.findIndex((v1: any) => v1.id === item1.id);
      if (index1 !== -1) {
        this.Ketqua.Tinhtrangda[index].Dapan[index1].Traloi = true;
      }
    }
  }
  ChonTraloiBonus(item: any,index:any) {
    this.Dieukienthem.Dapan.forEach((v: any) => {
      v.Traloi = ""
    });
    this.Dieukienthem.Dapan[index].Traloi = true
    this.Ketqua.Mota.Bonus = item
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
  NextStep() {
    const checkTraloi = this.Ketqua.Tinhtrangda.every((item: any) =>
      item.Dapan.some((item1: any) => item1.Traloi !== "")
    );
    if (!this.Ketqua.Mota.Bonus) {
      this._NotifierService.notify("error", "Vui lòng chọn đáp án")
    }
    else if (!checkTraloi) {
      this._NotifierService.notify("error", "Vui lòng chọn đáp án")
    }
    else {
      this.Ketqua.Tinhtrangda.forEach((v: any, k: any) => {
        const Dapan = v.Dapan.find((v1: any) => v1.Traloi == true)
        this.Ketqua.Ketqua['idTinhtrang_' + k] = v.id
        this.Ketqua.Ketqua['idDapanTinhtrang_' + k] = Dapan?.id
        this.Ketqua.Mota.Tinhtrang.push(Dapan)
      });
      this.Ketqua.Step = this.Ketqua.Step +1
      this._KetquaService.updateKetqua(this.Ketqua).subscribe(() => {
        this._LocalStorageService.setItem('Routine_Khachhang', this.Ketqua)
        this._router.navigate(['/routine-canhan/ketqua'])
      })
    }
  }
}
