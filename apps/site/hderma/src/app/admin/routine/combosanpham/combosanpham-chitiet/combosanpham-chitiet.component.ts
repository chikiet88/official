import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { environment } from 'apps/site/hderma/src/environments/environments';
import { UsersService } from '../../../../shared/users.service';
import { CombosanphamService } from '../../../../shared/combosanpham.service';
import { UploadService } from '../../../../shared/upload.service';
import { GenId, GetImage, groupByfield } from '../../../../shared/shared.utils';
import { CombosanphamComponent } from '../combosanpham.component';
import { SanphamService } from '../../../../shared/sanpham.service';
import { Observable, map, startWith } from 'rxjs';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { findIndex, indexOf } from 'cypress/types/lodash';
import { ThongtinchungService } from '../../../../shared/thongtinchung.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PhanloaidaService } from '../../../../shared/phanloaida.service';
import { TinhtrangdaService } from '../../../../shared/tinhtrangda.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-combosanpham-chitiet',
  templateUrl: './combosanpham-chitiet.component.html',
  styleUrls: ['./combosanpham-chitiet.component.css']
})
export class CombosanphamChitietComponent implements OnInit {
  Detail: any = {}
  Danhmuc: any[] = []
  APITINYMCE = environment.APITINYMCE;
  Sanphams: any[] = []
  filterSanphams: any[] = []
  Thongtins: any[] = []
  SelectSanpham:any

  filterCombos: any[] = []
  SelectCombo:any
  
  filterGroups: any[] = []
  SelectGroup:any

  SelectThongtin:any
  SelectDapanThongtin:any
  DapanThongtins: any[] = []

  Phanloais: any[] = []
  SelectPhanloai:any
  SelectDapanPhanloai:any
  DapanPhanloais: any[] = []

  Tinhtrangs: any[] = []
  Tinhtrang: any []= []
  SelectTinhtrang:any
  SelectDapanTinhtrang:any
  DapanTinhtrangs: any[] = []
  Dieukien:any={}
  receivedData:any={}
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userservice: UsersService,
    private _NotifierService: NotifierService,
    private _CombosanphamComponent: CombosanphamComponent,
    private _CombosanphamService: CombosanphamService,
    private _ThongtinchungService: ThongtinchungService,
    private _PhanloaidaService: PhanloaidaService,
    private _TinhtrangdaService: TinhtrangdaService,
    private _UploadService: UploadService,
    private _SanphamService: SanphamService,
    private spinnerService: NgxSpinnerService
  ) { }
  ngOnInit(): void {
    this._SanphamService.getProducts().subscribe();
    this._SanphamService.products$.subscribe((data: any) => {      
      data = data?.map((item: any) => {
        return { id: item.id, Tieude: item.Tieude,Slug:item.Slug,Hinhanh:item?.Hinhanh?.hinhthongtin?.spath};
      })
      this.Sanphams = this.filterSanphams = this.filterCombos = data
      this.route.params.subscribe((paramsId) => {       
        const id = paramsId['id'];
        if (id) {
          this._CombosanphamComponent.drawer.open();
          this._CombosanphamService.getByid(id).subscribe();
          this._CombosanphamService.combosanpham$.subscribe((res: any) => {
            if (res) {
              this.Detail = res  
              console.log(res);
              if(this.Detail.Dieukien.length>0) 
              { 
              this.GetThongtin(this.Detail.Dieukien)
              this.GetPhanloai(this.Detail.Dieukien)
              this.Detail.Dieukien.forEach((v:any,k:any) => {
                this.GetTinhtrang(v,k)
              });
              this.Detail.Groups.forEach((v:any,k:any) => {
                this.filterGroups[k] = this.Sanphams
              });
             
              } 
              this.spinnerService.hide();
            }
            else{this.spinnerService.show();}
          });
        }
      });
    })
  }
  GetTinhtrang(Dieukien:any,iDK:any)
  {    
    this._TinhtrangdaService.getAll().subscribe()
    this._TinhtrangdaService.tinhtrangdas$.subscribe((data)=>{ 
      if(data)
      {        
        data= groupByfield(data)
        const Thongtin =  this.Thongtins.find((v:any)=>v.id==this.Detail?.Dieukien[iDK]?.idThongtin_0);        
        const idThongtin =  Thongtin?.Dapan?.find((v:any)=>v.id==this.Detail?.Dieukien[iDK]?.idDapanThongtin_0)?.Nhom.id;               
        this.Tinhtrang[iDK]  = data.find((v:any)=> v.Nhom.id == idThongtin)
      }
    })
  }
  GetThongtin(Dieukien:any[])
  {
    this._ThongtinchungService.getAll().subscribe()
    this._ThongtinchungService.thongtinchungs$.subscribe((data)=>{
      if(data)
      {
      this.Thongtins = data   
      data.forEach((v,k) => {
        Dieukien.forEach((v1,k1)=>
          {
            this.Detail.Dieukien[k]['idThongtin_' + k1] !== ""
            ? this.Detail.Dieukien[k]['idThongtin_' + k1]
            : "";
          this.Detail.Dieukien[k]['idDapanThongtin_' + k1] !== ""
            ? this.Detail.Dieukien[k]['idDapanThongtin_' + k1]
            : "";
          })
      });
    }
    })
  }
  GetPhanloai(Dieukien:any[])
  {
    this._PhanloaidaService.getAll().subscribe()
    this._PhanloaidaService.phanloaidas$.subscribe((data)=>{    
      if(data)
      {
        this.Phanloais = groupByfield(data)
      this.Phanloais.forEach((v,k) => {
          Dieukien.forEach((v1,k1)=>
            {
              this.Detail.Dieukien[k]['idPhanloai_' + k1] !== ""
              ? this.Detail.Dieukien[k]['idPhanloai_' + k1]
              : "";
            
            this.Detail.Dieukien[k]['idDapanPhanloai_' + k1] !== ""
              ? this.Detail.Dieukien[k]['idDapanPhanloai_' + k1]
              : "";
            })
        });

      }  
    })
  }
  DieukienThongtin(data:any)
  {
    
    this.Thongtins.forEach((v,k) => {
      // console.log(v);
      if(data['idThongtin_'+k] ==v.id)
      {
       return v.Dapan.find((v1:any)=>v1.id == data['idDapanThongtin_'+k])
      }
      else return false
    });
  }
  displayFn(option: any): string {
    return option ? option.Tieude : '';
  }
  displayFn1(option: any): string {
    return option ? option.Cauhoi : '';
  }
  displayFn2(option: any): any {
    return option ? option.value : '';
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 2) {      
      this.filterSanphams = this.Sanphams.filter((v) => {
           return  v.Tieude.toLowerCase().includes(value)
       }
      )
    }
    else
    {
      this.filterSanphams = this.Sanphams
    }
  }
  AddDieukien()
  {
    this.Detail.Dieukien.push({})
    this.Update(this.Detail)
  }
  AddDieukienThongtin(Dieukien:any,iDK:any,item:any,item1:any,index:any)
  {
    this.GetTinhtrang(Dieukien,iDK)
    this.Detail.Dieukien[iDK]['idThongtin_'+index] = item?.id
    this.Detail.Dieukien[iDK]['idDapanThongtin_'+index] = item1?.id
  }
  CheckThongtin(Dieukien:any,iDK:any,item:any,item1:any,index:any)
  {    
    if(Dieukien['idThongtin_'+index]==item?.id && Dieukien['idDapanThongtin_'+index] == item1?.Nhom?.id)
    {
      return true
    }
    else if(Dieukien['idThongtin_'+index]==item?.id && Dieukien['idDapanThongtin_'+index] == item1?.id)
    {
      return true
    }
    else return false
  }
  AddDieukienPhanloai(Dieukien:any,iDK:any,item:any,item1:any,index:any)
  {
    this.Detail.Dieukien[iDK]['idPhanloai_'+index] = item?.Nhom?.id
    this.Detail.Dieukien[iDK]['idDapanPhanloai_'+index] = item1?.id
    console.log(this.Detail.Dieukien); 
  }
  CheckPhanloai(Dieukien:any,item:any,item1:any,index:any)
  {
    if(Dieukien['idPhanloai_'+index]==item?.Nhom?.id && Dieukien['idDapanPhanloai_'+index] == item1?.id)
    {
      return true
    }
    else return false
  }
  AddDieukienTrangthai(Dieukien:any,iDK:any,item:any,item1:any,index:any)
  {
    this.Detail.Dieukien[iDK]['idTinhtrang_'+index] = item?.id
    this.Detail.Dieukien[iDK]['idDapanTinhtrang_'+index] = item1?.id
  }
  CheckTinhtrang(Dieukien:any,item:any,item1:any,index:any)
  {
    if(Dieukien['idTinhtrang_'+index]==item?.id && Dieukien['idDapanTinhtrang_'+index] == item1?.id)
    {
      return true
    }
    else return false
  }
  AddGroups()
  {
    this.filterGroups[this.Detail.Groups.length] = this.Sanphams
    this.Detail.Groups.push({Title:'',Hinhanh:{},Sanpham:[]}) 
  }
  RemoveGroups(item:any,i:any)
  {
    this.Detail.Groups.splice(i, 1);
    this.filterGroups
  }
  ChoosenGroupsSanpham(item:any,index:any)
  { 
    this.Detail.Groups[index].Sanpham.push(item);
    this.SelectGroup={}
    this.filterGroups[index] = this.Sanphams.filter(item =>
      !this.Detail.Groups[index].Sanpham.some((dataItem: any) => dataItem.id === item.id)
    );
  }
  RemoveGroupsSanpham(item:any,index:any)
  {    
    this.Detail.Groups[index].Sanpham =  this.Detail.Groups[index].Sanpham.filter((v:any)=>v.id!==item.id)
    this.SelectGroup={}
    this.filterGroups[index] = this.Sanphams.filter(item =>
      !this.Detail.Groups[index].Sanpham.some((dataItem: any) => dataItem.id === item.id)
    );    
  }


  ChoosenSanpham(item:any)
  {   
    this.Detail.Sanpham.push(item);
    this.SelectSanpham={}
    this.filterSanphams = this.Sanphams.filter(item =>
      !this.Detail.Sanpham.some((dataItem: any) => dataItem.id === item.id)
    );
  }
  RemoveSanpham(item:any)
  {    
    this.Detail.Sanpham =  this.Detail.Sanpham.filter((v:any)=>v.id!==item.id)
    this.SelectSanpham={}
    this.filterSanphams = this.Sanphams.filter(item =>
      !this.Detail.Sanpham.some((dataItem: any) => dataItem.id === item.id)
    );    
  }

  ChoosenCombo(item:any)
  {
    this.Detail.Combo.push(item);
    this.SelectCombo={}
    this.filterCombos = this.Sanphams.filter(item =>
      !this.Detail.Combo.some((dataItem: any) => dataItem.id === item.id)
    );
  }
  RemoveCombo(item:any)
  {    
    this.Detail.Combo =  this.Detail.Combo.filter((v:any)=>v.id!==item.id)
    this.SelectCombo={}
    this.filterCombos = this.Sanphams.filter(item =>
      !this.Detail.Combo.some((dataItem: any) => dataItem.id === item.id)
    );    
  }
  RemoveDieukien(index:any)
  {
    this.Detail.Dieukien = this.Detail.Dieukien.filter((v:any, k:any) => k !== index);
  }
  configTiny: EditorComponent['init'] = {
    // selector: '.dfree-header',
    content_style: '.mce-content-body { border: 1px dashed blue; padding: 10px;  } '+'.mce-content-body p {margin-top: 0;margin-bottom: 0;}',
    menubar: false,
    inline: false,
    toolbar: 'undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
    plugins: [
       'quickbars','advlist','autolink','lists','link','image','charmap','preview','anchor',
      'searchreplace','visualblocks','code','fullscreen',
      'insertdatetime','media','table','code','help'
       ],
    // quickbars_insert_toolbar: 'undo redo',
    // quickbars_selection_toolbar: 'undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
    branding: false,
    image_advtab: true,
    autoresize_bottom_margin: 20,
    autoresize_min_height: 50,
    height:"200",
    statusbar:false,
    deprecation_warnings: false,
    default_link_target: '_blank',
    block_unsupported_drop: true,
    entity_encoding: 'raw',
        images_upload_handler: (blobInfo: any) => {
          const file = blobInfo.blob();
          const promise = new Promise<string>((resolve, reject) => {
            this._UploadService.uploadDriver(file).subscribe((res) => {
              if (res) {   
                resolve(GetImage(res.spath));
              }
            });
          });
          return promise;
        }, 
  };
  CloseDrawer() {
    this.router.navigate(['../'], { relativeTo: this.route });
    this._CombosanphamComponent.drawer.close();
    //location.reload();
  }
  Update(data: any) {
    this._CombosanphamService.updateCombosanpham(data).subscribe((res) => {
      if (res) {
        this._CombosanphamComponent.ngOnInit()
        this._NotifierService.notify("success", "Cập nhật thành công")
        location.reload();
      }
    });
  }
  GetImage(data: any) {
    return 'https://images.tazagroup.vn/'+data
  }
  GetUpload(e:any,i:any)
  {
    this.Detail.Groups[i].Hinhanh = e
      console.log(e);
      
  }
}
