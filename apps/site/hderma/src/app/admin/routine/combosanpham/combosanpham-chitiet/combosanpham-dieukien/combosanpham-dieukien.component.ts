import { Overlay } from '@angular/cdk/overlay';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { NotifierService } from 'angular-notifier';
import { CombosanphamService } from 'apps/site/hderma/src/app/shared/combosanpham.service';
import { PhanloaidaService } from 'apps/site/hderma/src/app/shared/phanloaida.service';
import { groupByfield, GetImage } from 'apps/site/hderma/src/app/shared/shared.utils';
import { ThongtinchungService } from 'apps/site/hderma/src/app/shared/thongtinchung.service';
import { TinhtrangdaService } from 'apps/site/hderma/src/app/shared/tinhtrangda.service';
import { UploadService } from 'apps/site/hderma/src/app/shared/upload.service';
import { UsersService } from 'apps/site/hderma/src/app/shared/users.service';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { SanphamService } from '../../../../sanpham/sanpham.service';
import { CombosanphamComponent } from '../../combosanpham.component';
@Component({
  selector: 'app-combosanpham-dieukien',
  templateUrl: './combosanpham-dieukien.component.html',
  styleUrls: ['./combosanpham-dieukien.component.css']
})
export class CombosanphamDieukienComponent implements OnInit {
  @Input() Dieukien: any;
  @Input() Index: any;
  Detail: any = {}
  Danhmuc: any[] = []
  Thongtins: any[] = []
  SelectThongtin:any
  SelectDapanThongtin:any
  DapanThongtins: any[] = []

  Phanloais: any[] = []
  SelectPhanloai:any
  SelectDapanPhanloai:any
  DapanPhanloais: any[] = []

  Tinhtrangs: any[] = []
  Tinhtrang: any = {}
  SelectTinhtrang:any
  SelectDapanTinhtrang:any
  DapanTinhtrangs: any[] = []
  constructor(
    private _ThongtinchungService: ThongtinchungService,
    private _PhanloaidaService: PhanloaidaService,
    private _TinhtrangdaService: TinhtrangdaService,

  ) { }
  ngOnInit(): void {
    console.log(this.Dieukien);
    
    this._ThongtinchungService.getAll().subscribe()
    this._ThongtinchungService.thongtinchungs$.subscribe((data)=>{
      if(data)
      {
      // console.log("Thongtin",data);
      this.Thongtins = data   
      data.forEach((v,k) => {
        this.Dieukien['idThongtin_'+k] = ""
        this.Dieukien['idDapanThongtin_'+k] = ""
      });
    }
    })
    this._PhanloaidaService.getAll().subscribe()
    this._PhanloaidaService.phanloaidas$.subscribe((data)=>{    
      if(data)
      {
        this.Phanloais = groupByfield(data)
        this.Phanloais.forEach((v,k) => {
          this.Dieukien['idPhanloai_'+k] = ""
          this.Dieukien['idDapanPhanloai_'+k] = ""
        });
      }  
    })
  }
  GetTinhtrang(Dieukien:any)
  {
    this._TinhtrangdaService.getAll().subscribe()
    this._TinhtrangdaService.tinhtrangdas$.subscribe((data)=>{ 
      if(data)
      {
        data= groupByfield(data)
        const Thongtin =  this.Thongtins.find((v:any)=>v.id==Dieukien.idThongtin_0);
        const idThongtin =  Thongtin.Dapan.find((v:any)=>v.id==Dieukien.idDapanThongtin_0)?.Nhom.id;               
        this.Tinhtrang  = data.find((v:any)=> v.Nhom.id == idThongtin)
        // this.Tinhtrang = groupByfield(data)
        // console.log("tinhtrang",this.Tinhtrang); 
      }
    })
  }
  AddDieukienThongtin(item:any,item1:any,index:any)
  {
    this.Dieukien['idThongtin_'+index] = item?.id
    this.Dieukien['idDapanThongtin_'+index] = item1?.id
    this.GetTinhtrang(this.Dieukien)
  }
  CheckThongtin(item:any,item1:any,index:any)
  {    
    if(this.Dieukien['idThongtin_'+index]==item?.id && this.Dieukien['idDapanThongtin_'+index] == item1?.Nhom?.id)
    {
      // console.log(this.Dieukien);
      return true
    }
    else if(this.Dieukien['idThongtin_'+index]==item?.id && this.Dieukien['idDapanThongtin_'+index] == item1?.id)
    {
      return true
    }
    else return false
  }
  AddDieukienPhanloai(item:any,item1:any,index:any)
  {    
    this.Dieukien['idPhanloai_'+index] = item.Nhom.id
    this.Dieukien['idDapanPhanloai_'+index] = item1.id
  }
  CheckPhanloai(item:any,item1:any,index:any)
  {
    if(this.Dieukien['idPhanloai_'+index]==item?.Nhom?.id && this.Dieukien['idDapanPhanloai_'+index] == item1?.id)
    {
      return true
    }
    else return false
  }
  LoadTinhtrang(item1:any,index:any)
  {
    if(index==0)
    {      
     this.Tinhtrang = this.Tinhtrangs.find(v=>v.Nhom.id==item1.Nhom.id)
     this.Tinhtrang?.children?.forEach((v:any,k:any) => {
     this.Dieukien['idTinhtrang_'+k] =""
     this.Dieukien['idDapanTinhtrang_'+k] =""
     });
    }
  }
  AddDieukienTrangthai(item:any,item1:any,index:any)
  {
    this.Dieukien['idTinhtrang_'+index] = item.id
    this.Dieukien['idDapanTinhtrang_'+index] = item1.id
    // console.log(this.Dieukien); 
  }
  CheckTinhtrang(item:any,item1:any,index:any)
  {
    if(this.Dieukien['idTinhtrang_'+index]==item?.id && this.Dieukien['idDapanTinhtrang_'+index] == item1?.id)
    {
      return true
    }
    else return false
  }
  @Output() dataEvent = new EventEmitter<any>();
  sendData() {
    const data ={Dieukien:this.Dieukien,index:this.Index}
    this.dataEvent.emit(data);
  }
}

